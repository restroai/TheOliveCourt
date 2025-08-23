import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import SpecialOffers from './components/SpecialOffers';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');

  const menuData = {
    appetizers: [
      {
        id: 1,
        name: "Truffle Arancini",
        description: "Crispy risotto balls with black truffle and mozzarella, served with truffle aioli",
        price: 14.99,
        image: "🍘",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 2,
        name: "Bruschetta Trio",
        description: "Three varieties: classic tomato & basil, roasted red pepper & goat cheese, wild mushroom",
        price: 12.99,
        image: "🥖",
        spicy: false,
        vegetarian: true,
        popular: false
      },
      {
        id: 3,
        name: "Spicy Tuna Tartare",
        description: "Fresh tuna with avocado, cucumber, and spicy mayo on crispy wonton",
        price: 16.99,
        image: "🐟",
        spicy: true,
        vegetarian: false,
        popular: true
      },
      {
        id: 4,
        name: "Bacon-Wrapped Dates",
        description: "Medjool dates stuffed with blue cheese, wrapped in crispy bacon",
        price: 13.99,
        image: "🥓",
        spicy: false,
        vegetarian: false,
        popular: false
      }
    ],
    mainCourses: [
      {
        id: 5,
        name: "Wagyu Beef Tenderloin",
        description: "8oz premium Wagyu beef with roasted garlic mashed potatoes and seasonal vegetables",
        price: 45.99,
        image: "🥩",
        spicy: false,
        vegetarian: false,
        popular: true
      },
      {
        id: 6,
        name: "Lobster Thermidor",
        description: "Fresh Maine lobster in classic French sauce with saffron risotto",
        price: 38.99,
        image: "🦞",
        spicy: false,
        vegetarian: false,
        popular: true
      },
      {
        id: 7,
        name: "Wild Mushroom Risotto",
        description: "Creamy Arborio rice with wild mushrooms, truffle oil, and aged Parmesan",
        price: 24.99,
        image: "🍄",
        spicy: false,
        vegetarian: true,
        popular: false
      },
      {
        id: 8,
        name: "Spicy Thai Basil Chicken",
        description: "Stir-fried chicken with Thai basil, chili, and vegetables in spicy sauce",
        price: 22.99,
        image: "🍗",
        spicy: true,
        vegetarian: false,
        popular: false
      },
      {
        id: 9,
        name: "Pan-Seared Sea Bass",
        description: "Fresh sea bass with lemon butter sauce, quinoa pilaf, and asparagus",
        price: 32.99,
        image: "🐠",
        spicy: false,
        vegetarian: false,
        popular: false
      }
    ],
    desserts: [
      {
        id: 10,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center, served with vanilla ice cream",
        price: 12.99,
        image: "🍫",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 11,
        name: "Crème Brûlée",
        description: "Classic vanilla custard with caramelized sugar crust",
        price: 10.99,
        image: "🍮",
        spicy: false,
        vegetarian: true,
        popular: false
      },
      {
        id: 12,
        name: "Tiramisu",
        description: "Italian dessert with coffee-soaked ladyfingers and mascarpone cream",
        price: 11.99,
        image: "☕",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 13,
        name: "Berry Pavlova",
        description: "Light meringue with fresh berries and whipped cream",
        price: 13.99,
        image: "🍓",
        spicy: false,
        vegetarian: true,
        popular: false
      }
    ],
    drinks: [
      {
        id: 14,
        name: "Signature Old Fashioned",
        description: "Bourbon, bitters, sugar cube, and orange peel",
        price: 14.99,
        image: "🥃",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 15,
        name: "Fresh Fruit Sangria",
        description: "Red wine with seasonal fruits and citrus",
        price: 12.99,
        image: "🍷",
        spicy: false,
        vegetarian: true,
        popular: false
      },
      {
        id: 16,
        name: "Espresso Martini",
        description: "Vodka, coffee liqueur, and fresh espresso",
        price: 13.99,
        image: "☕",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 17,
        name: "Craft Beer Selection",
        description: "Local and imported craft beers",
        price: 8.99,
        image: "🍺",
        spicy: false,
        vegetarian: true,
        popular: false
      }
    ]
  };

  return (
    <div className="App">
      <Header />
      <Hero />
      <MenuSection 
        menuData={menuData} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />
      <SpecialOffers />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
