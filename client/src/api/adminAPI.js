import api from './axios';
export const getAdminStatsAPI = async () => (await api.get('/admin/stats')).data;
export const getAdminUsersAPI = async () => (await api.get('/admin/users')).data;
export const deleteAdminUserAPI = async (id) => (await api.delete(`/admin/users/${id}`)).data;
export const getAdminOrdersAPI = async () => (await api.get('/admin/orders')).data;
export const updateOrderStatusAPI = async (id, status) => (await api.put(`/admin/orders/${id}/status`, { status })).data;
