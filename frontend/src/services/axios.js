import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-eight-orpin-21.vercel.app/api',
  withCredentials: true,
  timeout: 20000, // 20 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;