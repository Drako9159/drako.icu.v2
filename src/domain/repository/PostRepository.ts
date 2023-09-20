import { getAllPosts } from "controllers/post.controller";
import IPost from "../interface/IPost";
import PostModel from "../model/PostModel";
import { IListPost } from "../interface/IListPost";
import { IResponsePost } from "../../domain/interface/IResponsePost";
import { IUpdatePost } from "../../domain/interface/IUpdatePost";
import { IUpdateResponsePost } from "../../domain/interface/IUpdateResponsePost";

export interface PostRepository {
  getAllPosts(): Promise<IListPost[] | string>;
  getOnePostBySlug(slug: string): Promise<IResponsePost | string>;
  getOnePostById(id: string): Promise<IResponsePost | string>;
}

export interface PostRepositoryAdmin {
  deleteOnePost(id: string): Promise<string>;
  updateOnePost(id: string, post: IUpdatePost): Promise<IUpdateResponsePost | string>;
  saveOnePost(): Promise<IResponsePost | string>;
}
