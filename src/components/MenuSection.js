import React, { useState } from 'react';
import MenuItem from './MenuItem';
import './MenuSection.css';

const MenuSection = ({ menuData, activeCategory, setActiveCategory }) => {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'All Dishes', icon: '🍽️' },
    { id: 'appetizers', name: 'Appetizers', icon: '🥗' },
    { id: 'mainCourses', name: 'Main Courses', icon: '🍖' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'drinks', name: 'Drinks', icon: '🍷' }
  ];

  const filters = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'popular', name: 'Popular', icon: '⭐' },
    { id: 'vegetarian', name: 'Vegetarian', icon: '🌱' },
    { id: 'spicy', name: 'Spicy', icon: '🌶️' }
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
                  onClick={() => setFilter(filterOption.id)}
                >
                  <span className="filter-icon">{filterOption.icon}</span>
                  {filterOption.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="menu-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <MenuItem key={item.id} item={item} />
            ))
          ) : (
            <div className="no-items">
              <span className="no-items-icon">🍽️</span>
              <h3>No items found</h3>
              <p>Try adjusting your filters to see more options</p>
            </div>
          )}
        </div>

        <div className="menu-stats">
          <div className="stat">
            <span className="stat-number">{filteredItems.length}</span>
            <span className="stat-label">Items Available</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              ${filteredItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </span>
            <span className="stat-label">Total Value</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {filteredItems.filter(item => item.popular).length}
            </span>
            <span className="stat-label">Popular Items</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
