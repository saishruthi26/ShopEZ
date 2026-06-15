import api from './axios';
export const getCartAPI = async () => (await api.get('/cart')).data;
export const addToCartAPI = async (data) => (await api.post('/cart/add', data)).data;
export const updateCartItemAPI = async (data) => (await api.put('/cart/update', data)).data;
export const removeFromCartAPI = async (productId) => (await api.delete(`/cart/item/${productId}`)).data;
export const clearCartAPI = async () => (await api.delete('/cart/clear')).data;
