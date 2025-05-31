import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true,
  timeout: 20000, // 20 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;