import { Router } from "express";
import {
  saveOnePost,
  deleteOnePost,
  updateOnePost,
} from "../../controllers/post.controller";
const router: Router = Router();

router.delete("/:id", deleteOnePost);

router.post("/", saveOnePost);

router.put("/:id", updateOnePost);

export default router;
