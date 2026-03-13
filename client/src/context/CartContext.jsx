import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (product, size, quantity = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item._id === product._id && item.selectedSize === size
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      const sizeInfo = product.sizes?.find(s => s.ml === size);
      return [...prev, {
        _id: product._id,
        name: product.name,
        brand: product.brand,
        image: product.image,
        price: sizeInfo ? sizeInfo.price : product.price,
        selectedSize: size,
        quantity
      }];
    });
  };

  const removeItem = (id, size) => {
    setCartItems(prev => prev.filter(
      item => !(item._id === id && item.selectedSize === size)
    ));
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      removeItem(id, size);
      return;
    }
    setCartItems(prev => prev.map(item =>
      item._id === id && item.selectedSize === size
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCartItems = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, addItem, removeItem, updateQuantity, clearCartItems, totalItems, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
