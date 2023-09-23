import { Router } from "express";
import { validateUserPublic } from "../../../middlewares/validateUserPublic";
import {
  getAllPosts,
  getOnePost,
  searchPost,
} from "../../controllers/post.controller";
const router: Router = Router();

router.get("/", validateUserPublic, getAllPosts);

router.get("/:idOrSlug", validateUserPublic, getOnePost);

router.get("/search/:title", validateUserPublic, searchPost);

export default router;
