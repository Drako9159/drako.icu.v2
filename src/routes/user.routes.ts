import { Router } from "express";
import { deleteOneUser, getAllUsers, getOneUser, updateOneUser } from "../controllers/user.controller";

const router: Router = Router();

router.get("/", getAllUsers);

router.get("/:id", getOneUser)

router.delete("/:id", deleteOneUser);

router.put("/:id", updateOneUser)

export default router;
