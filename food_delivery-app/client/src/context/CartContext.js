import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedRestaurant = localStorage.getItem('cartRestaurant');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedRestaurant) {
      setRestaurant(JSON.parse(savedRestaurant));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    if (restaurant) {
      localStorage.setItem('cartRestaurant', JSON.stringify(restaurant));
    }
  }, [cart, restaurant]);

  const addToCart = (item, restaurantData) => {
    // Check if adding from different restaurant
    if (restaurant && restaurant._id !== restaurantData._id) {
      const confirm = window.confirm(
        'Your cart contains items from another restaurant. Do you want to clear it and add this item?'
      );
      if (!confirm) return;
      setCart([]);
    }

    setRestaurant(restaurantData);

    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const newCart = cart.filter((item) => item._id !== itemId);
    setCart(newCart);
    if (newCart.length === 0) {
      setRestaurant(null);
      localStorage.removeItem('cartRestaurant');
    }
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(
      cart.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setRestaurant(null);
    localStorage.removeItem('cart');
    localStorage.removeItem('cartRestaurant');
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    restaurant,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
