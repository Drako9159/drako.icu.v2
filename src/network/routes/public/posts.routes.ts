import { Router } from "express";
import { getAllPosts, getOnePost, searchPost } from "../../controllers/post.controller";
const router: Router = Router();

router.get("/", getAllPosts);

router.get("/:idOrSlug", getOnePost);

router.get("/search/:title", searchPost)

export default router;
