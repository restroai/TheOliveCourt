import React from 'react';
import './SpecialOffers.css';

const SpecialOffers = () => {
  const specials = [
    {
      id: 1,
      title: "Happy Hour",
      description: "50% off all cocktails and appetizers",
      time: "4:00 PM - 7:00 PM",
      days: "Monday - Friday",
      icon: "🍸",
      discount: "50% OFF",
      color: "gradient-1"
    },
    {
      id: 2,
      title: "Weekend Brunch",
      description: "Unlimited mimosas with any brunch entrée",
      time: "10:00 AM - 3:00 PM",
      days: "Saturday & Sunday",
      icon: "🥂",
      discount: "FREE MIMOSAS",
      color: "gradient-2"
    },
    {
      id: 3,
      title: "Chef's Tasting Menu",
      description: "5-course meal with wine pairing",
      time: "6:00 PM - 10:00 PM",
      days: "Thursday - Saturday",
      icon: "👨‍🍳",
      discount: "$89",
      color: "gradient-3"
    },
    {
      id: 4,
      title: "Date Night Special",
      description: "2 entrees + dessert + bottle of wine",
      time: "5:00 PM - 9:00 PM",
      days: "Tuesday & Wednesday",
      icon: "💕",
      discount: "$99",
      color: "gradient-4"
    }
  ];

  return (
    <section id="specials" className="special-offers section">
      <div className="container">
        <h2 className="section-title">Special Offers</h2>
        <p className="section-subtitle">
          Discover our exclusive deals and limited-time offers
        </p>
        
        <div className="specials-grid">
          {specials.map(special => (
            <div key={special.id} className={`special-card ${special.color}`}>
              <div className="special-header">
                <span className="special-icon">{special.icon}</span>
                <div className="discount-badge">{special.discount}</div>
              </div>
              
              <div className="special-content">
                <h3 className="special-title">{special.title}</h3>
                <p className="special-description">{special.description}</p>
                
                <div className="special-details">
                  <div className="detail">
                    <span className="detail-icon">🕒</span>
                    <span>{special.time}</span>
                  </div>
                  <div className="detail">
                    <span className="detail-icon">📅</span>
                    <span>{special.days}</span>
                  </div>
                </div>
                
                <button className="btn-reserve">
                  Reserve Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="loyalty-program">
          <div className="loyalty-content">
            <div className="loyalty-text">
              <h3>Join Our Loyalty Program</h3>
              <p>Earn points with every visit and unlock exclusive rewards</p>
              <ul className="loyalty-benefits">
                <li>🎁 Free dessert on your birthday</li>
                <li>💎 Priority reservations</li>
                <li>🍷 Complimentary wine tasting</li>
                <li>👨‍🍳 Chef's table experience</li>
              </ul>
              <button className="btn-join">Join Now</button>
            </div>
            <div className="loyalty-visual">
              <div className="points-card">
                <div className="card-header">
                  <h4>Gourmet Rewards</h4>
                  <span className="points">1,250 pts</span>
                </div>
                <div className="card-body">
                  <div className="progress-bar">
                    <div className="progress" style={{width: '75%'}}></div>
                  </div>
                  <p>250 more points until Gold Level</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
