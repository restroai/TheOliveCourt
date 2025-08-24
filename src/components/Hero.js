import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="highlight">The Olive Court</span>
            </h1>
            <p className="hero-subtitle">
              Experience authentic North Indian cuisine with our carefully curated menu featuring 
              traditional flavors, aromatic spices, and time-honored recipes from the heart of India.
            </p>
                          <div className="hero-features">
                <div className="feature">
                  <span className="feature-icon">⭐</span>
                  <span>5-Star Dining</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🌶️</span>
                  <span>Authentic Spices</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">👨‍🍳</span>
                  <span>Expert Chefs</span>
                </div>
              </div>
            <div className="hero-buttons">
              <button className="btn btn-primary">View Menu</button>
              <button className="btn btn-secondary">Make Reservation</button>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card">
              <div className="card-header">
                <h3>Today's Special</h3>
                <span className="special-badge">Chef's Choice</span>
              </div>
              <div className="card-content">
                <div className="special-dish">
                  <span className="dish-emoji">🍗</span>
                  <div className="dish-info">
                    <h4>Butter Chicken</h4>
                    <p>Tender chicken in rich tomato and butter gravy</p>
                    <span className="price">₹1582</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  );
};

export default Hero;
