import axios, { AxiosInstance } from "axios";
import { useAuthStore } from "../store/auth";

const authApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL_BACKEND,
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  config.headers["authorization"] = `Bearer ${token}`;
  
  return config;
});

export default authApi;
