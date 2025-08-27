import React, { useState } from 'react';
import MenuItem from './MenuItem';
import './MenuSection.css';

import Suggestion, { getChatResponse } from './Suggestion';

const MenuSection = ({ menuData, activeCategory, setActiveCategory, addToMyDishes }) => {
  const [filter, setFilter] = useState('all');
  const [showChat, setShowChat] = useState(false);
  const [aiIndexes, setAiIndexes] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiInput, setAiInput] = useState('');

  const categories = [
    { id: 'all', name: 'All Dishes', icon: '🍽️' },
    { id: 'appetizers', name: 'Appetizers', icon: '🥗' },
    { id: 'mainCourses', name: 'Main Courses', icon: '🍖' },
    { id: 'breads', name: 'Breads', icon: '🫓' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'drinks', name: 'Drinks', icon: '🍷' }
  ];

  const filters = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'popular', name: 'Popular', icon: '⭐' },
    { id: 'vegetarian', name: 'Vegetarian', icon: '🌱' },
    { id: 'spicy', name: 'Spicy', icon: '🌶️' },
    { id: 'ai', name: 'AI Suggestions', icon: '🤖' }
  ];

  const getFilteredItems = () => {
    let items = [];
    if (activeCategory === 'all') {
      Object.values(menuData).forEach(category => {
        items = items.concat(category);
      });
    } else {
      items = menuData[activeCategory] || [];
    }

    if (filter === 'popular') {
      items = items.filter(item => item.popular);
    } else if (filter === 'vegetarian') {
      items = items.filter(item => item.vegetarian);
    } else if (filter === 'spicy') {
      items = items.filter(item => item.spicy);
    } else if (filter === 'ai') {
      if (aiIndexes.length > 0) {
        items = items.filter(item => aiIndexes.includes(item.id));
      } else {
        items = [];
      }
    }
    return items;
  };

  const filteredItems = getFilteredItems();

  return (
    <section id="menu" className="menu-section section">
      <div className="container">
        <h2 className="section-title">Our Menu</h2>
        
        <div className="menu-filters">
          <div className="category-filters">
            <h3>Categories</h3>
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="filter-icon">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="dietary-filters">
              <h3>Filters</h3>
              <div className="filter-buttons">
                {filters.map(filterOption => (
                  <button
                    key={filterOption.id}
                    className={`filter-btn ${filter === filterOption.id ? 'active' : ''}`}
                    onClick={() => {
                      setFilter(filterOption.id);
                      if (filterOption.id === 'ai') {
                        setShowChat(true);
                      } else {
                        setShowChat(false);
                        setAiIndexes([]);
                      }
                    }}
                  >
                    <span className="filter-icon">{filterOption.icon}</span>
                    {filterOption.name}
                  </button>
                ))}
              </div>
            </div>
        </div>

        <div className="menu-grid">
          {aiLoading ? (
            <div className="no-items"><span>Loading AI suggestions...</span></div>
          ) : filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <MenuItem key={item.id} item={item} addToMyDishes={addToMyDishes} />
            ))
          ) : (
            <div className="no-items">
              <span className="no-items-icon">🍽️</span>
              <h3>No items found</h3>
              <p>Try adjusting your filters to see more options</p>
            </div>
          )}
        </div>

        {showChat && (
          <div className="ai-chat-popup">
            <div className="ai-chat-popup-card">
              <div className="ai-chat-header">
                <span>🤖 AI Suggestions</span>
              </div>
              <div className="ai-chat-body">
                <input
                  type="text"
                  value={aiInput}
                  onChange={e => setAiInput(e.target.value)}
                  placeholder="What are you craving for...?"
                  disabled={aiLoading}
                  style={{ width: '80%' }}
                />
                <button
                  className="ai-chat-action-btn"
                  onClick={async () => {
                    setAiLoading(true);
                    setAiError('');
                    try {
                      setShowChat(false); // Hide popup after search
                      const response = await getChatResponse(aiInput, menuData);
                      // Try to extract indexes from response (expecting a list of ids)
                      let indexes = [];
                      try {
                        // Try to parse as JSON array
                        const match = response.match(/\[(.*?)\]/);
                        if (match) {
                          indexes = JSON.parse(match[0]);
                        }
                      } catch (err) {
                        indexes = [];
                      }
                      setAiIndexes(indexes);
                    } catch (err) {
                      setAiError('Failed to get AI suggestions.');
                    }
                    setAiLoading(false);
                  }}
                  disabled={aiLoading || !aiInput.trim()}
                >Suggest</button>
                <button
                  className="ai-chat-action-btn"
                  style={{marginTop: '8px'}}
                  onClick={() => { setShowChat(false); /* Do not reset filter or aiIndexes */ }}
                >Close</button>
                {aiError && <div className="ai-chat-error">{aiError}</div>}
              </div>
              <div className="ai-chat-hint">Type your craving, e.g. "I want something spicy and vegetarian" Or "Mujhe kuch meetha khana hai 😜"</div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default MenuSection;
