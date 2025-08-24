import React from 'react';
import './Hero.css';
import TheOliveCourt from '../assets/images/TheOliveCourt.webp';
import { scrollToSection } from '../components/Header.js'; 


const Hero = () => {

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              <button className="btn btn-primary" onClick={() => scrollToSection('menu')}>View Menu</button>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card">
                <img className="rest-img" src={TheOliveCourt} alt="The Olive Court" width={400} border-radius="20px"/>
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
