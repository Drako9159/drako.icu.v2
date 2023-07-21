import { validateToken } from "../middlewares/validateJWT";
import {
  deleteOnePost,
  getAllPosts,
  getOnePost,
  saveOnePost,
  searchPost,
  updateOnePost,
} from "../controllers/post.controller";
import { Router } from "express";

const router: Router = Router();

router.post("/", saveOnePost);

router.get("/", getAllPosts);

router.get("/:id", getOnePost);

router.delete("/:id", deleteOnePost);

router.put("/:id", updateOnePost);

router.get("/search/:title", searchPost);

export default router;
