import axios from "./axios";
import { AxiosResponse } from "axios";

export async function getUsersList(): Promise<AxiosResponse> {
  return await axios.get("/users/");
}
export async function createOneUser(user: object): Promise<AxiosResponse> {
  return await axios.post("/auth/register", user);
}

export async function updateOneUser(
  id: string,
  user: object
): Promise<AxiosResponse> {
  return await axios.put(`/users/${id}`, user);
}

export async function deleteOneUser(id: string): Promise<AxiosResponse> {
  return await axios.delete(`/users/${id}`);
}
