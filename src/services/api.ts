import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.27.50.74:3333'
})

export default api;