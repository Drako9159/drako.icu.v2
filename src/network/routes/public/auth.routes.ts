import { Router } from "express";

const router: Router = Router();

router.post("/register");

router.post("/login");

router.get("/logout");

export default router;
