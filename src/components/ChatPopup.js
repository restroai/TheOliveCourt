import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatPopup.css';

export default function ChatPopup({ menuData, addToMyDishes }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();

  useEffect(() => { if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight; }, [messages, open]);

  const send = async (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);
    try {
      const apiBase = process.env.REACT_APP_API_BASE || (window.location && window.location.hostname === 'localhost' ? 'http://localhost:4000' : '');
      const url = apiBase ? `${apiBase}/api/chat` : '/api/chat';
      const resp = await axios.post(url, { message: text });
      const data = resp.data;
      // parse matches -> items
      const flat = Object.values(menuData).flat();
      const idMap = Object.fromEntries(flat.map(i => [String(i.id), i]));
      const items = (data.matches || []).map(id => idMap[String(id)]).filter(Boolean);
      setMessages(prev => [...prev, { role: 'assistant', content: data.reasoning || 'Here are some matches', items }]);
    } catch (err) {
      // Provide a clearer message for 404 vs other errors
      const status = err?.response?.status;
      const serverErr = err?.response?.data?.error || err?.response?.data || err.message;
      let errMsg = serverErr || 'Server unreachable';
      if (status === 404) errMsg = 'Endpoint not found (404). Is the backend running on port 4000 or is proxy configured?';
      setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, I could not reach the server: ${errMsg}` }]);
      console.error('Chat request failed', { status, serverErr, err });
    } finally { setLoading(false); }
  };

  const onSubmit = (e) => { e?.preventDefault(); send(input); };

  return (
    <div className={`chat-popup ${open ? 'open' : ''}`}>
      <button className="chat-toggle" onClick={() => setOpen(o => !o)}>{open ? '×' : 'Chat'}</button>
      {open && (
        <div className="chat-window">
          <div className="chat-messages" ref={containerRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                <div className="msg-text">{m.content}</div>
                {m.items && m.items.length > 0 && (
                  <div className="matches">
                    {m.items.map(it => (
                      <div key={it.id} className="match-item">
                        <img src={it.image} alt={it.name} />
                        <div className="match-info">
                          <div className="name">{it.name}</div>
                          <div className="meta">{[it.spicy && 'spicy', it.vegetarian && 'veg', it.popular && 'popular'].filter(Boolean).join(', ')}</div>
                          <div className="price">₹{it.price}</div>
                          <button onClick={() => addToMyDishes(it)} className="add-small">Add</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="msg assistant"><div className="msg-text">Thinking...</div></div>}
          </div>

          <form className="chat-input" onSubmit={onSubmit}>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="What are you feeling like?" />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}