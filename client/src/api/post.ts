import axios from "./axios";
import { AxiosResponse } from "axios";



export async function getPostsList(
  page: number = 0,
  is_public: boolean = false
): Promise<AxiosResponse> {
  return await axios.get(`/posts?page=${page}&is_public=${is_public}`);
}

export async function getPostsListByLanguage(
  language: string
): Promise<AxiosResponse> {
  return await axios.get(`/posts?language=${language}&is_public=true`);
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

export async function updateOnePost(
  id: string,
  post: object
): Promise<AxiosResponse> {
  return await axios.put(`/posts/${id}`, post);
}

export async function searchOnePost(title: string): Promise<AxiosResponse> {
  return await axios.get(`/posts/search/${title}`);
}
