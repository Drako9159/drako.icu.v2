import axios from "./axios";
import { Axios, AxiosResponse } from "axios";

export async function getPostsList(): Promise<AxiosResponse> {
  return await axios.get("/posts/get-all-posts");
}

export async function getOnePost(id: string): Promise<AxiosResponse> {
  return await axios.get(`/posts/get-one-post/${id}`);
}
export async function deleteOnePost(id: string): Promise<AxiosResponse> {
  return await axios.delete(`/posts/delete-one-post/${id}`);
}
export async function createOnePost(post: object): Promise<AxiosResponse> {
  return await axios.post("/posts/create-one-post", post);
}

export async function updateOnePost(id: string, post: object): Promise<AxiosResponse> {
  return await axios.put(`/posts/update-one-post/${id}`, post);
}