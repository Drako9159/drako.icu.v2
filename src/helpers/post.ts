import { IPost } from "interfaces/IPost";
import { Post } from "../models/Posts";

class Posts {
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
    content?: string
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
  }

  static async getAllPosts() {
    const posts = await Post.find({});
    const response = posts.map((e) => {
      const obj = {
        id: e._id,
        title: e.title,
        category: e.category,
        tag: e.tag,
        language: e.language,
        color: e.color,
        image: e.image,
        description: e.description,
        read_time: e.read_time,
        author: e.author,
        date: e.date,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
      };
      return obj;
    });
    return response;
  }

  async getOnePost() {
    const post = await Post.findById({ _id: this.id });
    if (!post) return false;
    return {
      id: post._id,
      title: post.title,
      category: post.category,
      tag: post.tag,
      language: post.language,
      color: post.color,
      image: post.image,
      description: post.description,
      read_time: post.read_time,
      author: post.author,
      date: post.date,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      content: post.content,
    };
  }

  async getAndDelete() {
    const deletePost = await Post.findByIdAndDelete({ _id: this.id });
    return deletePost;
  }

  async getAndUpdate() {
    const update = {
      title: this.title,
      category: this.category,
      tag: this.tag,
      language: this.language,
      color: this.color,
      image: this.image,
      description: this.description,
      read_time: this.read_time,
      author: this.author,
      date: this.date,
      content: this.content,
    };
    const post: IPost = (await Post.findByIdAndUpdate(
      { _id: this.id },
      update,
      { new: true }
    )) as IPost;
    return {
      title: post.title,
      category: post.category,
      tag: post.tag,
      language: post.language,
      color: post.color,
      image: post.image,
      description: post.description,
      read_time: post.read_time,
      author: post.author,
      date: post.date,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      content: post.content,
    };
  }
}

export default Posts;
