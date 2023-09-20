import {
  filterByIsPublic,
  filterByLanguage,
  sortByElement,
} from "../../utils/handleSorter";
import { Request, Response } from "express";
import handleError from "../../utils/handleError";
import { pageUtil } from "../../utils/handlePageable";
import PublicPostService from "../../service/PublicPostService";
import { IListPost } from "../../domain/interface/IListPost";

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
