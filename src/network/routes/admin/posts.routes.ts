import { Router } from "express";
import { saveOnePost, deleteOnePost, updateOnePost } from "../../controllers/post.controller";
const router: Router = Router();

router.post("/", saveOnePost);

router.delete("/:id", deleteOnePost);

router.put("/:id", updateOnePost)

export default router;
