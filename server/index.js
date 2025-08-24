import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import XLSX from 'xlsx';
import OpenAI from 'openai';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
// Accept raw text for /api/chat to avoid JSON parse errors from some clients (PowerShell quoting)
app.use('/api/chat', express.text({ type: '*/*' }));
app.use(express.json());

const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadMenu() {
  const filePath = path.join(__dirname, '..', 'src', 'assets', 'data', 'menu.xlsx');
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet);
  return data.map(item => ({
    ...item,
    image: item.image ? '/assets/images/' + item.image : '',
    price: Number(item.price) || 0,
    spicy: String(item.spicy).toLowerCase() === 'true',
    vegetarian: String(item.vegetarian).toLowerCase() === 'true',
    popular: String(item.popular).toLowerCase() === 'true'
  }));
}

const MENU = loadMenu();

app.get('/api/menu', (req, res) => {
  res.json(MENU);
});

app.post('/api/chat', async (req, res) => {
  // req.body may be a string (raw) when clients send text; try to parse if needed
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      console.log('Raw /api/chat body (not JSON):', body);
      // Try a permissive fallback: extract message from formats like {message:Hello} or {message:"Hello"}
      const msgMatch = body.match(/message\s*:\s*(?:"([^"]+)"|'([^']+)'|([^}]+))/i);
      if (msgMatch) {
        const extracted = (msgMatch[1] || msgMatch[2] || msgMatch[3] || '').trim();
        body = { message: extracted };
        console.log('Extracted message from raw body:', extracted);
      }
    }
  }
  const { message } = body || {};
  console.log('/api/chat message value:', message);

  // If mock mode is enabled, return a deterministic sample response for quick testing
  if (process.env.USE_MOCK === 'true') {
    try {
      const spicyMatches = MENU.filter(i => i.spicy).slice(0, 6).map(i => i.id);
      const sample = {
        matches: spicyMatches.length ? spicyMatches : MENU.slice(0, 6).map(i => i.id),
        reasoning: 'mock response (USE_MOCK=true): returning spicy items or first items'
      };
      return res.json(sample);
    } catch (e) {
      return res.json({ matches: MENU.slice(0, 6).map(i => i.id), reasoning: 'mock fallback' });
    }
  }

  if (!message) return res.status(400).json({ error: 'message required' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });

  const client = new OpenAI({ apiKey });

  // Build messages for the assistant
  const system = {
    role: 'system',
    content: 'You are a helpful assistant that must only suggest items from the provided menu JSON. Do not invent items. When asked for nutritional info, use the numeric fields if available.'
  };

  try {
    // Provide menu as context but keep prompt short — we stringify an array of names + tags to avoid huge prompts
    const menuSummary = MENU.map(i => ({ id: i.id, name: i.name, tags: { spicy: i.spicy, vegetarian: i.vegetarian, popular: i.popular }, price: i.price })).slice(0, 200);

    const assistantPrompt = `Menu JSON: ${JSON.stringify(menuSummary)}\nRespond with a JSON object: { matches: [<ids>], reasoning: "short text" }`;

    const resp = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [system, { role: 'user', content: message }, { role: 'user', content: assistantPrompt }],
      max_tokens: 300,
      temperature: 0.0
    });

    const text = resp.choices?.[0]?.message?.content || resp?.data?.choices?.[0]?.message?.content || '';
    let parsed = null;
    try { parsed = JSON.parse(text); } catch (e) {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
    }

    if (!parsed) {
      // fallback: simple keyword match
      const keywords = message.toLowerCase().split(/\W+/).filter(Boolean);
      const scored = MENU.map(item => {
        const hay = (JSON.stringify(item) + ' ' + (item.tags || '')).toLowerCase();
        const score = keywords.reduce((s, k) => s + (hay.includes(k) ? 1 : 0), 0);
        return { id: item.id, score };
      }).filter(s => s.score > 0).sort((a,b) => b.score - a.score).slice(0,6);
      return res.json({ matches: scored.map(s => s.id), reasoning: 'local keyword fallback' });
    }

    return res.json(parsed);
  } catch (err) {
    console.error(err?.response || err);
    return res.status(500).json({ error: 'OpenAI request failed', details: err?.response || err?.message || String(err) });
  }
});

app.post('/api/question', (req, res) => {
    const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    apiKey: "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",

});

// Function to ask a question
async function askQuestion(question) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini", // or "gpt-4o", "gpt-4.1", "gpt-3.5-turbo"
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: question },
    ],
  });

  return response.choices[0].message.content;
}

// Setup command line interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  while (true) {
    const question = await new Promise((resolve) =>
      rl.question("Ask a question (or type 'exit' to quit): ", resolve)
    );

    if (question.toLowerCase() === "exit") {
      rl.close();
      break;
    }

    const answer = await askQuestion(question);
    console.log("Assistant:", answer);
  }
}

main();
  
});

// Serve static build in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '..', 'build');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => res.sendFile(path.join(buildPath, 'index.html')));
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
