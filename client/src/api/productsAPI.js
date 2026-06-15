import api from './axios';
export const getProductsAPI = async (params) => (await api.get('/products', { params })).data;
export const getFeaturedProductsAPI = async () => (await api.get('/products/featured')).data;
export const getProductByIdAPI = async (id) => (await api.get(`/products/${id}`)).data;
export const getCategoriesAPI = async () => (await api.get('/products/categories')).data;
export const createProductAPI = async (data) => (await api.post('/products', data)).data;
export const updateProductAPI = async (id, data) => (await api.put(`/products/${id}`, data)).data;
export const deleteProductAPI = async (id) => (await api.delete(`/products/${id}`)).data;
export const createReviewAPI = async (productId, data) => (await api.post(`/products/${productId}/reviews`, data)).data;
