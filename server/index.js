const OpenAI = require("openai");
const XLSX = require('xlsx');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("Error: OPENAI_API_KEY is not set in environment variables.");
  process.exit(1);
}

const client = new OpenAI({ apiKey: OPENAI_API_KEY });

// Helper function to get menu items as a string
function getMenuItemsString() {
  const menuPath = path.join(__dirname, '..', 'src', 'assets', 'data', 'menu.xlsx');
  if (!fs.existsSync(menuPath)) return '';
  const workbook = XLSX.readFile(menuPath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const menuItems = XLSX.utils.sheet_to_json(worksheet);
  // Format menu items as a string for context
  return menuItems.map(item => `${item.name} (${item.price})`).join(', ');
}


export async function getChatResponse(userInput) {
  // Get menu items for context
  const menuContext = getMenuItemsString();

  try {
    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
            role: "system",
            content:
                `You are a helpful restaurant assistant. Only suggest food items from the following menu: ${menuContext}. Do not suggest anything outside this menu Only suggest 3 to 5 dishes based on the customer preference. Return a list of indexes of those dishes, nothing else.`
            },
            { role: "user", content: userInput },
      ],
    });
        return response.choices[0].message.content;
    } catch (err) {
        console.error("Error fetching chat response:", err);
        throw err;
    }
}

// Usage example:
const userInput = "What dishes are spicy?";
getChatResponse(userInput).then(answer => {
  console.log("Assistant:", answer);
});