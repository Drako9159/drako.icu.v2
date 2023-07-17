import axios from "./axios";
import { AxiosResponse } from "axios";

export async function getPostsRequest(
  language: string
): Promise<AxiosResponse> {
  return await axios.get(`/posts?language=${language}`);
}

export async function getPostRequest(id: string): Promise<AxiosResponse> {
  return await axios.get(`/posts/${id}`);
}

export async function syncDrive(): Promise<AxiosResponse> {
  return await axios.get("/sync_drive");
}
