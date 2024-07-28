import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4500/api', // Adjust the base URL as needed
});

export default instance;
