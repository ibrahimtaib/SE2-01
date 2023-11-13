/* eslint-disable no-useless-catch */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
  withCredentials: true
});


export const addPage = async (application) => {
  try {
    const response = await api.post('/applications/', application);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;