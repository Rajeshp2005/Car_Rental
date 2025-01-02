import axios from 'axios';

export const backendUrl = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: backendUrl,
});