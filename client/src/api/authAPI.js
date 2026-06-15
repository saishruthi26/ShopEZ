import api from './axios';
export const loginAPI = async (data) => (await api.post('/auth/login', data)).data;
export const registerAPI = async (data) => (await api.post('/auth/register', data)).data;
