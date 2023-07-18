import { validateToken } from "../middlewares/validateJWT";
import { deleteOnePost, getAllPosts, getOnePost, saveOnePost, updateOnePost } from "../controllers/post.controller";
import { Router } from "express";

const router: Router = Router();

router.post("/create-one-post", saveOnePost);

router.get("/get-all-posts", getAllPosts);

router.get("/get-one-post/:id", getOnePost)

router.delete("/delete-one-post/:id", deleteOnePost)

router.put("/update-one-post/:id", updateOnePost)

export default router;
