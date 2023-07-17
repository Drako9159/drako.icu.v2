import { Router } from "express";
import { deleteOneUser, getAllUsers, getOneUser, updateOneUser } from "../controllers/user.controller";

const router: Router = Router();

router.get("/get-all-users", getAllUsers);

router.get("/get-one-user/:id", getOneUser)

router.delete("/delete-one-user/:id", deleteOneUser);

router.put("/update-one-user/:id", updateOneUser)

export default router;
