import axios from "./axios";
import { AxiosResponse } from "axios";

const email = import.meta.env.VITE_USER_EMAIL;
const password = import.meta.env.VITE_USER_PASSWORD;

export async function registerUser(user: object): Promise<AxiosResponse> {
  return await axios.post("/auth/register", user);
}

export async function loginUserWebsite() {
  return await axios.post("/auth/login", { email, password });
}

export async function loginUser(email: string, password: string) {
  return await axios.post("/auth/login", { email, password });
}

export async function logoutUser() {
  return await axios.get("/auth/logout");
}

export async function createUser(user: object): Promise<AxiosResponse> {
  return await axios.post("/users/create-one-user", user);
}

// export async function dashboardLoginRequest(
//   user: string,
//   password: string
// ): Promise<AxiosResponse> {
//   return await axios.post("/login", { user, password });
// }
