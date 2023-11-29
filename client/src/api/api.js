/* eslint-disable no-useless-catch */
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
  withCredentials: true,
});

export const addPage = async (proposal) => {
  try {
    const response = await api.post("/proposals/", proposal);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addApplication = async (application) => {
  try {
    const response = await api.post("/applications/", application);
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteProposal = async (proposal) => {
  try {
    return await api.delete(`/proposals/${proposal.id}/`);
  } catch (error) {
    return null;
  }
};

export const checkUser = async (user) => {
  try {
    const response = await api.post("/checkAuth", user, {
      credentials: "include",
      timeout: 5000, // Add this line to include credentials
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await api.get("sessions/current", {
      withCredentials: true,
    });

    const userInfo = response.data;
    console.log(userInfo);

    return userInfo;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api.get("/logout");
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendMail = async (applicationId, studentDetails, action) => {
  try {
    const response = await api.post("/notifications/send-email", {
      applicationId,
      student: studentDetails,
      action,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
