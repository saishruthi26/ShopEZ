import api from './axios';
export const createOrderAPI = async (data) => (await api.post('/orders', data)).data;
export const getMyOrdersAPI = async () => (await api.get('/orders/my')).data;
export const getOrderByIdAPI = async (id) => (await api.get(`/orders/${id}`)).data;
