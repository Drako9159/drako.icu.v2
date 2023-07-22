import { Post } from "../../models/Posts";

class FindPostService {
  static async findBySlug(slug: string) {
    const post = await Post.findOne({ slug: slug });
    if (!post) return "POST_NOT_FOUND";
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

  static async findById(id: string) {
    const post = await Post.findById({ _id: id });
    if (!post) return "POST_NOT_FOUND";
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

export default FindPostService;
