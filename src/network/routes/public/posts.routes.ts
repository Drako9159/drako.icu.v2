import { Router } from "express";

const router: Router = Router();

router.get("/", getAllPosts)

export default router;