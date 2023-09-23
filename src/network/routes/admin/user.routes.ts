import { Router } from "express";
import { validateUserAdmin } from "../../../middlewares/validateUserAdmin";
const router: Router = Router();
import {
  deleteOneUser,
  getAllUsers,
  getUserFull,
  updateBlocked,
  updateRole,
  createOneUser,
} from "../../controllers/user.controller";

router.get("/get-all-users", validateUserAdmin, getAllUsers);

router.get("/get-full-one-user/:id", validateUserAdmin, getUserFull);

router.delete("/delete-one-user/:id", validateUserAdmin, deleteOneUser);

router.put("/update-user-role/:id", validateUserAdmin, updateRole);

router.put("/update-user-blocked/:id", validateUserAdmin, updateBlocked);

router.post("/create-one-user", validateUserAdmin, createOneUser);

export default router;
