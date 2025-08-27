import React, { useState, useRef, useEffect } from 'react';
import './ChatPopup.css';
import { getChatResponse } from './Suggestion'; // Import from Suggestion.js

export default function ChatPopup({ menuData }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages, open]);

  // Show welcome message when chat is opened
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: "What would you like to have? Tell me your preference and I will suggest accordingly."
        }
      ]);
    }
  }, [open, messages.length]);

  const send = async (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);
    try {
      const answer = await getChatResponse(text, menuData); // Pass menuData here
      setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Unable to get response.' }]);
    }
    setLoading(false);
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