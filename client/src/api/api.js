/* eslint-disable no-useless-catch */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
  withCredentials: true
});


export const addPage = async (proposal) => {
  try {
    const response = await api.post('/proposals/', proposal);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addApplication = async (application) => {
    try {
      const response = await api.post("/applications/", application);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
const applicationApi = {
  addApplication: async (application) => {
    const response = await api.post("/applications/", application);
    if (response.status === 500) {
      throw new Error("Internal Server Error");
    }
    return response;
  },
};

export default api;
