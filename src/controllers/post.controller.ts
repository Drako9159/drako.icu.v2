import { Request, Response } from "express";
import handleErrorResponse from "../utils/handleErrorResponse";

import CreatePost from "../helpers/createPost";

import Posts from "../helpers/post";
import { Post } from "models/Posts";

export async function saveOnePost(req: Request, res: Response) {
  try {
    const {
      title,
      category,
      tag,
      language,
      color,
      description,
      read_time,
      author,
      date,
      content,
    } = req.body;

    if (
      !title ||
      !category ||
      !tag ||
      !language ||
      !color ||
      !description ||
      !read_time ||
      !author ||
      !date ||
      !content
    )
      return handleErrorResponse(
        res,
        400,
        "Error 400 - Please Fill Elements!!"
      );
    if (language !== "en" && language !== "es")
      return handleErrorResponse(res, 400, "Language only accept es or en!");

    const post = new CreatePost(
      title,
      category,
      tag,
      language,
      color,
      description,
      read_time,
      author,
      date,
      content
    );
    const saveUser = await post.savePost();
    return res.status(201).json({
      message: "Post Created",
      id: saveUser._id,
    });
  } catch (error) {
    console.error(error);
    return handleErrorResponse(res);
  }
}

export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await Posts.getAllPosts();
    return res.status(200).json({
      posts,
    });
  } catch (error) {
    console.error(error);
    return handleErrorResponse(res);
  }
}

export async function getOnePost(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const posts = new Posts(id);
    const post = await posts.getOnePost();
    if (!post) return handleErrorResponse(res, 404, "Post doesn't exist!");
    return res.status(200).json({
      post,
    });
  } catch (error) {
    console.error(error);
    return handleErrorResponse(res, 400, "Post doesn't exist!");
  }
}

export async function deleteOnePost(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const posts = new Posts(id);
    const post = await posts.getAndDelete();
    return res.status(204).json({
      message: "User Deleted",
      posts,
    });
  } catch (error) {
    console.error(error);
    return handleErrorResponse(res, 400, "User doesn't exist!");
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
      description,
      read_time,
      author,
      date,
      content,
    } = req.body;

    if (language !== "en" && language !== "es")
      return handleErrorResponse(res, 400, "Language only accept es or en!");

    const posts = new Posts(
      id,
      title,
      category,
      tag,
      language,
      color,
      description,
      read_time,
      author,
      date,
      content
    );
    const post = await posts.getAndUpdate();
    return res.status(200).json({
      message: "Post Updated",
      post,
    });
  } catch (error) {
    console.error(error);
    return handleErrorResponse(res);
  }
}
