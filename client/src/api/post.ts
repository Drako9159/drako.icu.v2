import axios from "./axios";
import { Axios, AxiosResponse } from "axios";

export async function getPostsList(): Promise<AxiosResponse> {
  return await axios.get("/posts/");
}

export async function getPostsListByLanguage(language: string): Promise<AxiosResponse>{
  return await axios.get(`/posts?language=${language}`)
}

export async function getOnePost(id: string): Promise<AxiosResponse> {
  return await axios.get(`/posts/${id}`);
}
export async function deleteOnePost(id: string): Promise<AxiosResponse> {
  return await axios.delete(`/posts/${id}`);
}
export async function createOnePost(post: object): Promise<AxiosResponse> {
  return await axios.post("/posts/", post);
}

export async function updateOnePost(id: string, post: object): Promise<AxiosResponse> {
  return await axios.put(`/posts/${id}`, post);
}