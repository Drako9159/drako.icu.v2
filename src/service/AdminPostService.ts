import IPost from "../domain/interface/IPost";
import { PostRepositoryAdmin } from "../domain/repository/PostRepository";
import PostModel from "../domain/model/PostModel";
import { IListPost } from "../domain/interface/IListPost";
import mongoose from "mongoose";
import { IResponsePost } from "../domain/interface/IResponsePost";
import { IUpdatePost } from "../domain/interface/IUpdatePost";
import handleSlug from "../utils/handleSlug";
import { IUpdateResponsePost } from "../domain/interface/IUpdateResponsePost";
import { ICreatePost } from "domain/interface/ICreatePost";

class AdminPostService implements PostRepositoryAdmin {
  async deleteOnePost(id: string) {
    const isId = mongoose.Types.ObjectId.isValid(id);
    if (!isId) return "POST_NOT_FOUND";
    const postDeleted = await PostModel.findByIdAndDelete({ _id: id });
    if (!postDeleted) return "POST_NOT_FOUND";
    return "POST_DELETED";
  }

  async updateOnePost(id: string, post: IUpdatePost) {
    const postUpdated: IUpdatePost = {
      title: post.title,
      slug: post.title ? handleSlug(post.title) : undefined,
      category: post.category,
      tag: post.tag,
      language: post.language,
      color: post.color,
      image: post.image,
      description: post.description,
      read_time: post.read_time,
      author: post.author,
      date: post.date,
      is_public: post.is_public,
      content: post.content,
    };

    const isId = mongoose.Types.ObjectId.isValid(id);
    if (!isId) return "POST_NOT_FOUND";

    const postResult: IPost = (await PostModel.findByIdAndUpdate(
      { _id: id },
      postUpdated,
      { new: true }
    )) as IPost;

    const response: IUpdateResponsePost = {
      title: postResult.title,
      slug: postResult.slug,
      category: postResult.category,
      tag: postResult.tag,
      language: postResult.language,
      color: postResult.color,
      image: postResult.image,
      description: postResult.description,
      read_time: postResult.read_time,
      author: postResult.author,
      date: postResult.date,
      is_public: postResult.is_public,
      createdAt: postResult.createdAt,
      updatedAt: postResult.updatedAt,
      content: postResult.content,
    };
    return response;
  }

  async saveOnePost(post: ICreatePost): {

    


    return "sda";
  }
}

export default AdminPostService;
