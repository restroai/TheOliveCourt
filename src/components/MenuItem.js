import React, { useState } from 'react';
import './MenuItem.css';

const MenuItem = ({ item, addToMyDishes }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`menu-item ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="item-image">
        {/* <span className="item-emoji">{item.image}</span> */}
        <img src={item.image} alt={item.name} width={375}/>
        {item.popular && (
          <div className="popular-badge">
            <span>⭐ Popular</span>
          </div>
        )}
        {item.spicy && (
          <div className="spicy-badge">
            <span>🌶️ Spicy</span>
          </div>
        )}
        {item.vegetarian && (
          <div className="vegetarian-badge">
            <span>🌱 Vegetarian</span>
          </div>
        )}
      </div>
      
      <div className="item-content">
        <div className="item-header">
          <h3 className="item-name">{item.name}</h3>
          <span className="item-price">₹{item.price}</span>
        </div>
        
        <p className="item-description">{item.description}</p>
        
        <div className="item-badges">
          {item.popular && <span className="badge popular">Popular</span>}
          {item.spicy && <span className="badge spicy">Spicy</span>}
          {item.vegetarian && <span className="badge vegetarian">Vegetarian</span>}
        </div>
        
        <div className="item-actions">
          <button 
            className="btn-add-to-cart"
            onClick={() => addToMyDishes(item)}
          >
            <span>🍽️</span>
            Add to My Dishes
          </button>
          <button className="btn-favorite">
            <span>❤️</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
