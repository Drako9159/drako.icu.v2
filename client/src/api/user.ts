import axios from "./axios";
import { AxiosResponse } from "axios";

export async function getUsersList(): Promise<AxiosResponse> {
  return await axios.get("/users/get-all-users");
}
