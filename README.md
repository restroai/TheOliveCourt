# 🍽️ The Olive Court - Restaurant Menu

A modern, responsive restaurant menu website built with React. This customer-centric application showcases a comprehensive dining experience with interactive features, beautiful design, and excellent user experience.

## ✨ Features

### 🎨 Modern Design
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Beautiful Gradients**: Eye-catching color schemes and visual effects
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Typography**: Elegant fonts (Playfair Display & Poppins) for professional appearance

### 🍽️ Comprehensive Menu System
- **Multiple Categories**: Appetizers, Main Courses, Desserts, and Drinks
- **Interactive Filtering**: Filter by category, popularity, dietary preferences (vegetarian, spicy)
- **Detailed Item Cards**: Each dish includes description, price, and dietary badges
- **Visual Indicators**: Popular items, spicy dishes, and vegetarian options clearly marked

### 🎯 Customer-Centric Features
- **Special Offers Section**: Happy hour, weekend brunch, chef's tasting menu
- **Loyalty Program**: Points system with rewards and benefits
- **Reservation System**: Easy-to-use booking form with date/time selection
- **Contact Information**: Complete contact details and social media links

### 📱 User Experience
- **Smooth Navigation**: Fixed header with smooth scrolling to sections
- **Mobile-First Design**: Optimized for all screen sizes
- **Interactive Elements**: Hover effects, buttons, and form validation
- **Loading States**: Visual feedback for user interactions

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd restaurant-menu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # Navigation header
│   ├── Hero.js         # Landing section
│   ├── MenuSection.js  # Menu display and filtering
│   ├── MenuItem.js     # Individual menu item card
│   ├── SpecialOffers.js # Promotions and deals
│   ├── About.js        # Restaurant story and team
│   ├── Contact.js      # Contact form and info
│   └── Footer.js       # Footer with links
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles
```

## 🎨 Design System

### Color Palette
- **Primary**: `#ff6b6b` (Coral Red)
- **Secondary**: `#ee5a24` (Orange)
- **Accent**: `#667eea` (Purple Blue)
- **Text**: `#2c3e50` (Dark Blue Gray)
- **Background**: `#f5f7fa` (Light Gray)

### Typography
- **Headings**: Playfair Display (serif)
- **Body Text**: Poppins (sans-serif)

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Glassmorphism design with backdrop blur

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🍽️ Menu Categories

### Appetizers
- Truffle Arancini
- Bruschetta Trio
- Spicy Tuna Tartare
- Bacon-Wrapped Dates

### Main Courses
- Wagyu Beef Tenderloin
- Lobster Thermidor
- Wild Mushroom Risotto
- Spicy Thai Basil Chicken
- Pan-Seared Sea Bass

### Desserts
- Chocolate Lava Cake
- Crème Brûlée
- Tiramisu
- Berry Pavlova

### Drinks
- Signature Old Fashioned
- Fresh Fruit Sangria
- Espresso Martini
- Craft Beer Selection

## 🎯 Special Features

### Interactive Menu Filtering
- Filter by category (All, Appetizers, Main Courses, etc.)
- Filter by dietary preferences (Vegetarian, Spicy)
- Filter by popularity
- Real-time item count and total value display

### Reservation System
- Date and time selection
- Guest count options
- Special requests field
- Form validation

### Customer Engagement
- Social media integration
- Loyalty program showcase
- Special offers and promotions
- Team member profiles

## 🔧 Customization

### Adding New Menu Items
Edit the `menuData` object in `src/App.js`:

```javascript
const menuData = {
  appetizers: [
    {
      id: 1,
      name: "New Dish Name",
      description: "Dish description",
      price: 15.99,
      image: "🍽️",
      spicy: false,
      vegetarian: true,
      popular: false
    }
  ]
  // ... other categories
};
```

### Modifying Colors
Update the CSS custom properties in the component files or create a central theme file.

### Adding New Sections
Create new components in the `src/components/` directory and import them in `App.js`.

## 🌟 Performance Features

- **Optimized Images**: Using emojis for fast loading
- **CSS Grid & Flexbox**: Modern layout techniques
- **Minimal Dependencies**: Lightweight React application
- **Responsive Images**: Scalable vector graphics

## 📞 Support

For questions or support, please contact:
- Email: info@gourmethaven.com
- Phone: (555) 123-4567

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Icons**: Emoji icons for visual appeal
- **Fonts**: Google Fonts (Playfair Display & Poppins)
- **Design Inspiration**: Modern restaurant websites
- **React**: Facebook's React library

---

**Enjoy your dining experience at The Olive Court! 🍽️✨**
