import axios from '../lib/axios';

export const updateProfile = async (profileData) => {
  const response = await axios.put('/api/user/profile', profileData);
  return response.data;
};
