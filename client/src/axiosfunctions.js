import axios from 'axios';

let baseURL;
if (process.env.NODE_ENV === 'production') {
  baseURL = '/api';
} else {
  baseURL = 'http://localhost:8000/api';
}

export const makeRequestNoCred = axios.create({
  baseURL,
});

export const makeRequest = axios.create({
  baseURL,
  withCredentials: true,
});
