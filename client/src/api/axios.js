import axios from 'axios';

// In production (Vercel), use the full Render backend URL.
// In development, Vite proxy handles /api → localhost:5000
const baseURL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('shopez_user') || 'null');
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default api;

