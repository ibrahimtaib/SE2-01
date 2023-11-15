/* eslint-disable no-useless-catch */
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
  withCredentials: true,
});

const applicationApi = {
  addApplication: async (application) => {
    const response = await api.post("/applications/", application);
    if (response.status === 500) {
      throw new Error("Internal Server Error");
    }
    return response;
  },
};

export default applicationApi;
