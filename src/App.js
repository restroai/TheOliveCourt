import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MyDishes from './components/MyDishes';
import './App.css';
import ChatPopup from './components/ChatPopup';

import { parseExcelFile } from './utils/excelParser';
import menuDataFile from './assets/data/menu.xlsx';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [myDishes, setMyDishes] = useState([]);
  const [showMyDishes, setShowMyDishes] = useState(false);
  const [menuData, setMenuData] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const loadMenuData = async () => {
      const data = await parseExcelFile(menuDataFile);
      if (data) {
        setMenuData(data);
      }
    };
    loadMenuData();
  }, []);

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

  if (!menuData) {
    return <div>Loading...</div>;
  }

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
            filter={filter}
            setFilter={setFilter}
            showChat={showChat}
            setShowChat={setShowChat}
          />
          {/* <About /> */}
          <Contact />
          {/* <Footer /> */}
          <ChatPopup setFilter={setFilter} setShowChat={setShowChat}/>
        </>
      )}
    </div>
  );
}

export default App;
