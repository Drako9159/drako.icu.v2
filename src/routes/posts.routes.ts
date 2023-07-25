import { validateUserPublic } from "../middlewares/validateUserPublic";
import { validateUserAdmin } from "../middlewares/validateUserAdmin";
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

// admin 

router.post("/", validateUserAdmin, saveOnePost);

router.delete("/:id", validateUserAdmin, deleteOnePost);

router.put("/:id", validateUserAdmin, updateOnePost);

// public

router.get("/search/:title", validateUserPublic, searchPost);

router.get("/", validateUserPublic, getAllPosts);

router.get("/:idOrSlug", validateUserPublic, getOnePost);

export default router;
