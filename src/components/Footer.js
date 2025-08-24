import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>🍽️ The Olive Court</h3>
              <p>Culinary Excellence Since 2008</p>
            </div>
            <p className="footer-description">
              Experience the finest dining with our award-winning chefs and 
              carefully curated menu featuring the best ingredients from around the world.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📺</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Menu Categories</h4>
            <ul className="footer-links">
              <li><a href="#menu">Appetizers</a></li>
              <li><a href="#menu">Main Courses</a></li>
              <li><a href="#menu">Desserts</a></li>
              <li><a href="#menu">Drinks</a></li>
              <li><a href="#specials">Chef's Specials</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p>📍 123 Gourmet Street, Downtown District</p>
              <p>📞 (555) 123-4567</p>
              <p>✉️ info@gourmethaven.com</p>
              <p>🕒 Mon-Fri: 11:00 AM - 10:00 PM</p>
              <p>🕒 Sat-Sun: 10:00 AM - 11:00 PM</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} The Olive Court. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
