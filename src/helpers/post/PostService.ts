import { IPost } from "../../interfaces/IPost";
import { Post } from "../../models/Posts";
import handleSlug from "../../utils/handleSlug";
import mongoose from "mongoose";
class PostService {
  private id: string | undefined;
  private title: string | undefined;
  private category: string | undefined;
  private tag: string | undefined;
  private language: string | undefined;
  private color: string | undefined;
  private image: string | undefined;
  private description: string | undefined;
  private read_time: string | undefined;
  private author: string | undefined;
  private date: string | undefined;
  private content: string | undefined;
  private is_public: boolean | undefined;

  constructor(
    id?: string,
    title?: string,
    category?: string,
    tag?: string,
    language?: string,
    color?: string,
    image?: string,
    description?: string,
    read_time?: string,
    author?: string,
    date?: string,
    content?: string,
    is_public?: boolean
  ) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.tag = tag;
    this.language = language;
    this.color = color;
    this.image = image;
    this.description = description;
    this.read_time = read_time;
    this.author = author;
    this.date = date;
    this.content = content;
    this.is_public = is_public;
  }

  static async getPosts() {
    const posts = await Post.find({});
    const response = posts.map((e) => {
      const obj = {
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
      return obj;
    });
    return response;
  }

  async deletePost() {
    const isId = mongoose.Types.ObjectId.isValid(this.id as string);
    if (!isId) return "POST_NOT_FOUND";
    const deletePost = await Post.findByIdAndDelete({ _id: this.id });
    return deletePost;
  }

  async updatePost() {
    const update = {
      title: this.title,
      slug: this.title ? handleSlug(this.title) : undefined,
      category: this.category,
      tag: this.tag,
      language: this.language,
      color: this.color,
      image: this.image,
      description: this.description,
      read_time: this.read_time,
      author: this.author,
      date: this.date,
      is_public: this.is_public,
      content: this.content,
    };
    const isId = mongoose.Types.ObjectId.isValid(this.id as string);
    if (!isId) return "POST_NOT_FOUND";
    const post: IPost = (await Post.findByIdAndUpdate(
      { _id: this.id },
      update,
      { new: true }
    )) as IPost;
    return {
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
  }
}

export default PostService;
