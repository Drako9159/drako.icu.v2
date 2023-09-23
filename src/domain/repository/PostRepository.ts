import { IListPost } from "../interface/IListPost";
import { IPostResponse } from "../interface/IPostResponse";
import { IPostUpdate } from "../interface/IPostUpdate";
import { IPostUpdatedResponse } from "../interface/IPostUpdatedResponse";
import { IPostCreate } from "../../domain/interface/IPostCreate";

export interface PostRepository {
  getAllPosts(): Promise<IListPost[] | string>;
  getOnePostBySlug(slug: string): Promise<IPostResponse | string>;
  getOnePostById(id: string): Promise<IPostResponse | string>;
}

export interface PostRepositoryAdmin {
  deleteOnePost(id: string): Promise<string>;
  updateOnePost(id: string, post: IPostUpdate): Promise<IPostUpdatedResponse | string>;
  saveOnePost(post: IPostCreate): Promise<IPostCreate>;
}
