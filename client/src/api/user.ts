import axios from "./axios";
import { AxiosResponse } from "axios";

export async function getUsersList(): Promise<AxiosResponse> {
  return await axios.get("/users/get-all-users/");
}

export async function updateOneUser(
  id: string,
  user: object
): Promise<AxiosResponse> {
  return await axios.put(`/users/update-one-user/${id}`, user);
}

export async function deleteOneUser(id: string): Promise<AxiosResponse> {
  return await axios.delete(`/users/delete-one-user/${id}`);
}

export async function updateRole(id: string, role: object): Promise<AxiosResponse> {
  return await axios.put(`/users/update-user-role/${id}`, role);
}

export async function updateBlocked(id: string, blocked: object): Promise<AxiosResponse> {
  return await axios.put(`/users/update-user-blocked/${id}`, blocked);
}
