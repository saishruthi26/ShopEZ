import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCartAPI, addToCartAPI, updateCartItemAPI, removeFromCartAPI, clearCartAPI } from '../api/cartAPI';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) { setCart({ items: [] }); return; }
    try {
      setLoading(true);
      const data = await getCartAPI();
      setCart(data);
    } catch (err) {
      console.error('Cart fetch error:', err);
    } finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    const data = await addToCartAPI({ productId, quantity });
    setCart(data);
    return data;
  };

  const updateItem = async (productId, quantity) => {
    const data = await updateCartItemAPI({ productId, quantity });
    setCart(data);
  };

  const removeItem = async (productId) => {
    const data = await removeFromCartAPI(productId);
    setCart(data);
  };

  const clearCart = async () => {
    await clearCartAPI();
    setCart({ items: [] });
  };

  const cartCount = cart?.items?.reduce((acc, i) => acc + i.quantity, 0) || 0;
  const cartTotal = cart?.items?.reduce((acc, i) => acc + (i.product?.price || 0) * i.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, loading, cartCount, cartTotal, addToCart, updateItem, removeItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
