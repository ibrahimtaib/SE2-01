import axios from "axios";
let token = null;
const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
    "x-access-token": token,
  },
});
// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Modify the request config, e.g., update the headers
    config.headers["x-access-token"] = token;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
export default {
  login: async function (email, password) {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      if (response.status === 200) {
        console.log("Logged in!");
        this.setApiToken(response.data.token);
        return response.data.user;
      }
      return undefined;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  helloTeacher: async function () {
    console.log("IN");
    try {
      const response = await api.get("/teachers");
      if (response.status === 200) {
        console.log("Hello teacher!");
        return response.data;
      }
      console.log(response);
      return null;
    } catch (error) {
      return error;
    }
  },
  setApiToken: function (tok) {
    token = tok;
  },
  clearApiToken: function () {
    token = null;
  },
};