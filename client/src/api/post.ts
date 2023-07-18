import axios from "./axios";
import { AxiosResponse } from "axios";

export async function getPostsList(): Promise<AxiosResponse> {
  return await axios.get("/posts/get-all-posts");
}
export async function deleteOnePost(id: string): Promise<AxiosResponse> {
  return await axios.delete(`/posts/delete-one-post/${id}`);
}
