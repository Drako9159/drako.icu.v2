import {
  filterByIsPublic,
  filterByLanguage,
  sortByElement,
} from "../../utils/handleSorter";
import { Request, Response } from "express";
import handleError from "../../utils/handleError";
import { pageUtil } from "../../utils/handlePageable";
import PublicPostService from "../../service/PublicPostService";
import AdminPostService from "../../service/AdminPostService";
import { IListPost } from "../../domain/interface/IListPost";
import { IUpdatePost } from "../../domain/interface/IUpdatePost";
import { ICreatePost } from "../../domain/interface/ICreatePost";

// Public

export async function getAllPosts(req: Request, res: Response) {
  try {
    const { sort, language, page, size, is_public }: any = req.query;
    const publicPostService = new PublicPostService();
    let posts: IListPost[] | string = await publicPostService.getAllPosts();
    if (typeof posts === "string") return handleError(res, 404, posts);
    let data = [...posts];
    posts = sortByElement(sort, data);
    posts = filterByLanguage(language, posts);
    posts = filterByIsPublic(is_public, posts);
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

export async function getOnePost(req: Request, res: Response) {
  try {
    const idOrSlug = req.params.idOrSlug;
    let post;
    const publicPostService = new PublicPostService();
    post = await publicPostService.getOnePostById(idOrSlug);
    if (post === "POST_NOT_FOUND")
      post = await publicPostService.getOnePostBySlug(idOrSlug);
    if (post === "POST_NOT_FOUND") return handleError(res, 404, post);
    return res.status(200).json({
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
    const publicPostService = new PublicPostService();
    let posts = await publicPostService.getAllPosts();
    if (typeof posts === "string") return handleError(res, 404, posts);
    posts = posts.filter((e) => e.title.toLowerCase().includes(title));
    return res.status(200).json({
      results: posts,
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

// Admin

export async function deleteOnePost(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const adminPostService = new AdminPostService();
    const post = await adminPostService.deleteOnePost(id);
    if (post === "POST_NOT_FOUND") return handleError(res, 404, post);
    return res.status(204).json({
      message: "POST_DELETED",
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

export async function updateOnePost(req: Request, res: Response) {
  try {
    const id = req.params.id;
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
    const adminPostService = new AdminPostService();
    const postUpdated: IUpdatePost = {
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
    };
    const post = await adminPostService.updateOnePost(id, postUpdated);
    if (post === "POST_NOT_FOUND") return handleError(res, 404, post);
    return res.status(200).json({
      message: "POST_UPDATED",
      post,
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

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
      "content",
      "is_public",
    ].filter((field) => !req.body[field]);
    if (fields.length > 0) {
      return handleError(res, 400, `require: [${fields.join(", ")}]`);
    }

    if (language !== "en" && language !== "es")
      return handleError(res, 400, "language: enum [es, en]");

    if (is_public) {
      if (is_public !== "true" && is_public !== "false")
        return handleError(res, 400, "is_public: boolean as string [true, false]");
    }

    const postCreated: ICreatePost = {
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
    };

    const adminPostService = new AdminPostService();
    const post = await adminPostService.saveOnePost(postCreated);

    return res.status(201).json({
      message: "POST_CREATED",
      id: post._id,
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}
