import React, { useCallback } from 'react';
import './ChatPopup.css';

export default function ChatPopup({ setFilter, setShowChat }) {
  const handleClick = useCallback(() => {
    if (setFilter) setFilter('ai');
    if (setShowChat) setShowChat(true);
    const aiBtn = document.querySelector('.filter-btn[data-filter="ai"]');
    if (aiBtn) {
      aiBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      aiBtn.focus();
    }
  }, [setFilter, setShowChat]);

  return (
    <div className="chat-popup">
      <button
        className="chat-toggle ai-icon-btn"
        title="Try AI Suggestions!"
        onClick={handleClick}
      >✨</button>
    </div>
  );
}