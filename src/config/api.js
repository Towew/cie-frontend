import axios from 'axios';

export const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || 'https://dumbmerch-b32-server.herokuapp.com/api/v1/' || 'http://localhost:5000/api/v1/',
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.commin['Authorization'];
  }
};