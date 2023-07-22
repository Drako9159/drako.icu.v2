import { Request, Response } from "express";
import handleError from "../utils/handleError";
import { pageUtil } from "../utils/handlePageable";
import { filterByLanguage, sortByElement } from "../utils/handleSorter";
import FindPostService from "../helpers/post/FindPostService";
import PostService from "../helpers/post/PostService";
import CreatePostService from "../helpers/post/CreatePostService";

export async function saveOnePost(req: Request, res: Response) {
  try {
    const {
      title,
      category,
      tag,
      language,
      color,
      image,
      description,
      read_time,
      author,
      date,
      is_public,
      content,
    } = req.body;

    const fields = [
      "title",
      "category",
      "tag",
      "language",
      "color",
      "image",
      "description",
      "read_time",
      "author",
      "date",
      "is_public",
      "content",
    ].filter((field) => !req.body[field]);
    if (fields.length > 0) {
      return handleError(res, 400, `require: [${fields.join(", ")}]`);
    }
    if (language !== "en" && language !== "es")
      return handleError(res, 400, "enum [es, en]");
    const post = new CreatePostService(
      title,
      category,
      tag,
      language,
      color,
      image,
      description,
      read_time,
      author,
      date,
      content,
      is_public
    );
    const saveUser = await post.savePost();
    return res.status(201).json({
      message: "POST_CREATED",
      id: saveUser._id,
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

export async function getAllPosts(req: Request, res: Response) {
  try {
    const { sort, language, page, size }: any = req.query;
    let posts = await PostService.getPosts();
    let data = [...posts];
    posts = sortByElement(sort, data);
    posts = filterByLanguage(language, posts);
    const { content, pageDefinition } = pageUtil(posts, page, size, sort);
    posts = content;
    return res.status(200).json({
      posts,
      ...pageDefinition,
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

// export async function getOnePost(req: Request, res: Response) {
//   try {
//     const id = req.params.id;
//     const posts = new Posts(id);
//     let post;
//     try {
//       post = await posts.getOnePost();
//     } catch (error) {
//       const posts = new FindPost(id);
//       post = await posts.getBySlug();
//     }
//     if (!post) {
//       return handleError(res, 404, "POST_NOT_FOUND");
//     }
//     return res.status(200).json({
//       post,
//     });
//   } catch (error) {
//     console.error(error);
//     return handleError(res, 404, "POST_NOT_FOUND");
//   }
// }

export async function getOnePost(req: Request, res: Response) {
  try {
    const idOrSlug = req.params.idOrSlug;
    let post;
    post = await FindPostService.findById(idOrSlug);
    if (post === "POST_NOT_FOUND")
      post = await FindPostService.findBySlug(idOrSlug);
    if (post === "POST_NOT_FOUND") return handleError(res, 404, post);
    return res.status(200).json({
      post,
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

export async function deleteOnePost(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const posts = new PostService(id);
    const post = await posts.deletePost();
    return res.status(204).json({
      message: "USER_DELETED",
      posts,
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

export async function updateOnePost(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const {
      title,
      category,
      tag,
      language,
      color,
      image,
      description,
      read_time,
      author,
      date,
      content,
      is_public,
    } = req.body;

    if (language !== "en" && language !== "es")
      return handleError(res, 400, "enum [es, en]");

    const posts = new PostService(
      id,
      title,
      category,
      tag,
      language,
      color,
      image,
      description,
      read_time,
      author,
      date,
      content,
      is_public
    );
    const post = await posts.updatePost();
    return res.status(200).json({
      message: "POST_UPDATED",
      post,
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

export async function searchPost(req: Request, res: Response) {
  try {
    const title = req.params.title;
    if (!title) return handleError(res, 400, "require: string [title]");
    let posts = await PostService.getPosts();
    posts = posts.filter((e) => e.title.toLowerCase().includes(title));
    return res.status(200).json({
      results: posts,
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}
