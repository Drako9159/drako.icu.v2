import axios from "./axios";
import { AxiosResponse } from "axios";

const user = import.meta.env.VITE_USER_KEY;
const password = import.meta.env.VITE_USER_PASSWORD;

export async function loginRequest(): Promise<AxiosResponse> {
  return await axios.post("/login", { user, password });
}

export async function dashboardLoginRequest(
  user: string,
  password: string
): Promise<AxiosResponse> {
  return await axios.post("/login", { user, password });
}
