import { Post } from "../models/Posts";

class FindPost {
  private slug: string | undefined;

  constructor(slug?: string) {
    this.slug = slug;
  }

  async getBySlug() {
    const post = await Post.findOne({ slug: this.slug });
    if (!post) return false;
    return {
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
  }
}

export default FindPost;
