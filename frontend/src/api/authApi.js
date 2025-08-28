import axios from '../lib/axios';

export const loginUser = async (credentials) => {
  await axios.get('/sanctum/csrf-cookie');
  const response = await axios.post('/api/login', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  await axios.get('/sanctum/csrf-cookie');
  const response = await axios.post('/api/register', userData);
  return response.data;
};

export const logoutUser = async () => {
  await axios.post('/api/logout');
};

export const fetchUser = async () => {
  const response = await axios.get('/api/user');
  return response.data.user;
};
