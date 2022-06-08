import axios from "axios";
import { SERVER_URI } from "../config";

const httpClient = axios.create({
  baseURL: `${SERVER_URI}`,
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

export default httpClient;