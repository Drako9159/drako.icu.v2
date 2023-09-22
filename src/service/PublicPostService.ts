import { PostRepository } from "../domain/repository/PostRepository";
import PostModel from "../domain/model/PostModel";
import { IListPost } from "../domain/interface/IListPost";
import mongoose from "mongoose";
import { IResponsePost } from "../domain/interface/IResponsePost";

class PublicPostService implements PostRepository {
  async getAllPosts() {
    const posts = await PostModel.find({});
    if (!posts) return "POST_NOT_FOUND";
    const response = posts.map((e) => {
      const post: IListPost = {
        id: e._id,
        title: e.title,
        slug: e.slug,
        category: e.category,
        tag: e.tag,
        language: e.language,
        color: e.color,
        image: e.image,
        description: e.description,
        read_time: e.read_time,
        author: e.author,
        date: e.date,
        is_public: e.is_public,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
      };
      return post;
    });
    return response;
  }

  async getOnePostBySlug(slug: string) {
    const post = await PostModel.findOne({ slug: slug });
    if (!post) return "POST_NOT_FOUND";
    const postValidate: IResponsePost = {
      id: post._id,
      title: post.title,
      slug: post.slug,
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
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      content: post.content,
    };
    return postValidate;
  }

  async getOnePostById(id: string) {
    const isId = mongoose.Types.ObjectId.isValid(id as string);
    if (!isId) return "POST_NOT_FOUND";
    const post = await PostModel.findById({ _id: id });
    if (!post) return "POST_NOT_FOUND";
    const postValidate: IResponsePost = {
      id: post._id,
      title: post.title,
      slug: post.slug,
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
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      content: post.content,
    };
    return postValidate;
  }
}

export default PublicPostService;
