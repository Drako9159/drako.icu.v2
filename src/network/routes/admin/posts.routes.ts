import { Router } from "express";
import { validateUserAdmin } from "../../../middlewares/validateUserAdmin";
import {
  saveOnePost,
  deleteOnePost,
  updateOnePost,
} from "../../controllers/post.controller";
const router: Router = Router();

router.delete("/:id", validateUserAdmin, deleteOnePost);

router.post("/", validateUserAdmin, saveOnePost);

router.put("/:id", validateUserAdmin, updateOnePost);

export default router;
