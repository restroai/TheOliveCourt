import React, { useCallback } from 'react';
import './ChatPopup.css';

export default function ChatPopup({ setFilter, setShowChat }) {
  // Scroll to AI Suggestions filter when button is clicked
  const handleClick = useCallback(() => {
    if (setFilter) setFilter('ai');
    if (setShowChat) setShowChat(true);
    // Scroll to AI Suggestions filter button
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
        title="T  ry AI Suggestions!"
        onClick={handleClick}
      >
        {/* Modern AI icon SVG */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="13" fill="#fff" stroke="#ff6b6b" strokeWidth="2" />
          <path d="M9 14a5 5 0 0 1 10 0v2a5 5 0 0 1-10 0v-2z" fill="#ff6b6b" />
          <circle cx="11" cy="14" r="1.2" fill="#fff" />
          <circle cx="17" cy="14" r="1.2" fill="#fff" />
        </svg>
      </button>
    </div>
  );
}