import { Post } from "../models/Posts";

class CreatePost {
  private title: string;
  private category: string;
  private tag: string;
  private language: string;
  private color: string;
  private image: string;
  private description: string;
  private read_time: string;
  private author: string;
  private date: string;
  private content: string;

  constructor(
    title: string,
    category: string,
    tag: string,
    language: string,
    color: string,
    image: string,
    description: string,
    read_time: string,
    author: string,
    date: string,
    content: string
  ) {
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

  async savePost() {
    const post = await new Post({
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
    });
    const savedPost = await post.save();
    return savedPost;
  }
}

export default CreatePost;
