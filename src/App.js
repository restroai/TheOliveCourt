import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import SpecialOffers from './components/SpecialOffers';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MyDishes from './components/MyDishes';
import './App.css';

import samosaChaat from "./Assets/Images/samosaChaat2.webp";
import paneerTikka from "./Assets/Images/paneerTikka.jpg";



function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [myDishes, setMyDishes] = useState([]);
  const [showMyDishes, setShowMyDishes] = useState(false);

  const addToMyDishes = (item) => {
    setMyDishes(prevDishes => {
      const existingDish = prevDishes.find(dish => dish.id === item.id);
      if (existingDish) {
        return prevDishes.map(dish => 
          dish.id === item.id 
            ? { ...dish, quantity: dish.quantity + 1 }
            : dish
        );
      } else {
        return [...prevDishes, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromMyDishes = (itemId) => {
    setMyDishes(prevDishes => prevDishes.filter(dish => dish.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromMyDishes(itemId);
    } else {
      setMyDishes(prevDishes => 
        prevDishes.map(dish => 
          dish.id === itemId 
            ? { ...dish, quantity: newQuantity }
            : dish
        )
      );
    }
  };

  const menuData = {
    appetizers: [
      {
        id: 1,
        name: "Samosa Chaat",
        description: "Crispy samosas topped with chutneys, yogurt, and sev, served with tamarind sauce",
        price: 749,
        image: samosaChaat,
        spicy: true,
        vegetarian: true,
        popular: true
      },
      {
        id: 2,
        name: "Paneer Tikka",
        description: "Marinated cottage cheese cubes grilled in tandoor with mint chutney",
        price: 999,
        image: paneerTikka,
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 3,
        name: "Chicken 65",
        description: "Spicy deep-fried chicken with curry leaves and red chili, Andhra style",
        price: 1165,
        image: "🍗",
        spicy: true,
        vegetarian: false,
        popular: true
      },
      {
        id: 4,
        name: "Aloo Tikki",
        description: "Spiced potato patties served with mint chutney and tamarind sauce",
        price: 665,
        image: "🥔",
        spicy: false,
        vegetarian: true,
        popular: false
      },
      {
        id: 5,
        name: "Veg Spring Rolls",
        description: "Crispy rolls filled with mixed vegetables and served with sweet chili sauce",
        price: 832,
        image: "🌯",
        spicy: false,
        vegetarian: true,
        popular: false
      }
    ],
    mainCourses: [
      {
        id: 6,
        name: "Butter Chicken",
        description: "Tender chicken in rich tomato and butter gravy, served with naan bread",
        price: 1582,
        image: "🍗",
        spicy: false,
        vegetarian: false,
        popular: true
      },
      {
        id: 7,
        name: "Paneer Butter Masala",
        description: "Cottage cheese in creamy tomato gravy with aromatic spices",
        price: 1415,
        image: "🧀",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 8,
        name: "Chicken Tikka Masala",
        description: "Grilled chicken in creamy tomato sauce with fenugreek and cream",
        price: 1665,
        image: "🍗",
        spicy: true,
        vegetarian: false,
        popular: true
      },
      {
        id: 9,
        name: "Dal Makhani",
        description: "Slow-cooked black lentils with cream and butter, traditional Punjabi style",
        price: 1082,
        image: "🫘",
        spicy: false,
        vegetarian: true,
        popular: false
      },
      {
        id: 10,
        name: "Rogan Josh",
        description: "Tender lamb in aromatic Kashmiri gravy with yogurt and spices",
        price: 1915,
        image: "🐑",
        spicy: true,
        vegetarian: false,
        popular: false
      },
      {
        id: 11,
        name: "Palak Paneer",
        description: "Fresh spinach curry with cottage cheese and mild spices",
        price: 1248,
        image: "🥬",
        spicy: false,
        vegetarian: true,
        popular: false
      },
      {
        id: 12,
        name: "Chicken Biryani",
        description: "Fragrant basmati rice cooked with tender chicken and aromatic spices",
        price: 1832,
        image: "🍚",
        spicy: true,
        vegetarian: false,
        popular: true
      },
      {
        id: 13,
        name: "Veg Biryani",
        description: "Aromatic rice with mixed vegetables and traditional biryani spices",
        price: 1499,
        image: "🍚",
        spicy: false,
        vegetarian: true,
        popular: false
      }
    ],
    breads: [
      {
        id: 14,
        name: "Butter Naan",
        description: "Soft leavened bread brushed with butter and baked in tandoor",
        price: 332,
        image: "🫓",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 15,
        name: "Garlic Naan",
        description: "Naan bread topped with garlic and coriander, baked in tandoor",
        price: 415,
        image: "🫓",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 16,
        name: "Roti",
        description: "Whole wheat flatbread made without oil, healthy option",
        price: 249,
        image: "🫓",
        spicy: false,
        vegetarian: true,
        popular: false
      },
      {
        id: 17,
        name: "Laccha Paratha",
        description: "Layered whole wheat bread with ghee, flaky and delicious",
        price: 332,
        image: "🫓",
        spicy: false,
        vegetarian: true,
        popular: false
      }
    ],
    desserts: [
      {
        id: 18,
        name: "Gulab Jamun",
        description: "Soft milk solids dumplings soaked in rose-flavored sugar syrup",
        price: 582,
        image: "🍯",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 19,
        name: "Rasmalai",
        description: "Soft cottage cheese patties soaked in sweetened milk with cardamom",
        price: 665,
        image: "🥛",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 20,
        name: "Kheer",
        description: "Traditional rice pudding with milk, sugar, and aromatic spices",
        price: 499,
        image: "🍚",
        spicy: false,
        vegetarian: true,
        popular: false
      },
      {
        id: 21,
        name: "Jalebi",
        description: "Crispy spiral-shaped sweet soaked in sugar syrup",
        price: 582,
        image: "🌀",
        spicy: false,
        vegetarian: true,
        popular: false
      }
    ],
    drinks: [
      {
        id: 22,
        name: "Mango Lassi",
        description: "Sweet yogurt drink with fresh mango pulp and cardamom",
        price: 415,
        image: "🥭",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 23,
        name: "Masala Chai",
        description: "Traditional spiced tea with milk, ginger, and aromatic spices",
        price: 332,
        image: "☕",
        spicy: false,
        vegetarian: true,
        popular: true
      },
      {
        id: 24,
        name: "Thandai",
        description: "Cooling drink with almonds, saffron, and rose water",
        price: 499,
        image: "🥛",
        spicy: false,
        vegetarian: true,
        popular: false
      },
      {
        id: 25,
        name: "Sweet Lassi",
        description: "Sweetened yogurt drink with rose water and cardamom",
        price: 374,
        image: "🥛",
        spicy: false,
        vegetarian: true,
        popular: false
      }
    ]
  };

  return (
    <div className="App">
      {showMyDishes ? (
        <MyDishes 
          myDishes={myDishes}
          removeFromMyDishes={removeFromMyDishes}
          updateQuantity={updateQuantity}
          setShowMyDishes={setShowMyDishes}
        />
      ) : (
        <>
          <Header myDishes={myDishes} setShowMyDishes={setShowMyDishes} />
          <Hero />
          <MenuSection 
            menuData={menuData} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory}
            addToMyDishes={addToMyDishes}
          />
          <SpecialOffers />
          <About />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
