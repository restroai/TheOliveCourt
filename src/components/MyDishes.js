import React from 'react';
import './MyDishes.css';

const MyDishes = ({ myDishes, removeFromMyDishes, updateQuantity, setShowMyDishes }) => {
  const getTotalPrice = () => {
    return myDishes.reduce((total, dish) => total + (dish.price * dish.quantity), 0);
  };

  const getTotalItems = () => {
    return myDishes.reduce((total, dish) => total + dish.quantity, 0);
  };

  if (myDishes.length === 0) {
    return (
      <section className="my-dishes section">
        <div className="container">
          <div className="my-dishes-header">
            <h2 className="section-title">My Dishes</h2>
            <button 
              className="close-btn"
              onClick={() => setShowMyDishes(false)}
            >
              ✕
            </button>
          </div>
          <div className="empty-cart">
            <span className="empty-icon">🍽️</span>
            <h3>Your dish list is empty</h3>
            <p>Add some delicious dishes to get started!</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowMyDishes(false)}
            >
              Browse Menu
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="my-dishes section">
      <div className="container">
        <div className="my-dishes-header">
          <h2 className="section-title">My Dishes ({getTotalItems()} items)</h2>
          <button 
            className="close-btn"
            onClick={() => setShowMyDishes(false)}
          >
            ✕
          </button>
        </div>

        <div className="dishes-list">
          {myDishes.map(dish => (
            <div key={dish.id} className="dish-item">
              <div className="dish-image">
                <span className="dish-emoji">{dish.image}</span>
              </div>
              
              <div className="dish-details">
                <h3 className="dish-name">{dish.name}</h3>
                <p className="dish-description">{dish.description}</p>
                <div className="dish-badges">
                  {dish.popular && <span className="badge popular">Popular</span>}
                  {dish.spicy && <span className="badge spicy">Spicy</span>}
                  {dish.vegetarian && <span className="badge vegetarian">Vegetarian</span>}
                </div>
              </div>

              <div className="dish-controls">
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(dish.id, dish.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity">{dish.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(dish.id, dish.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="dish-price">₹{dish.price}</div>
                <div className="dish-total">₹{dish.price * dish.quantity}</div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromMyDishes(dish.id)}
                  title="Remove from My Dishes"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="dishes-summary">
          <div className="summary-row">
            <span>Total Items:</span>
            <span>{getTotalItems()}</span>
          </div>
          <div className="summary-row total">
            <span>Total Amount:</span>
            <span>₹{getTotalPrice()}</span>
          </div>
          
          <div className="summary-actions">
            <button className="btn btn-primary" onClick={() => setShowMyDishes(false)}>
              Add more food items
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyDishes;
