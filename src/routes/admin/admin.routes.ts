import { validate } from "uuid";
import {
  deleteOneUser,
  getAllUsers,
  getOneUser,
  updateBlocked,
  updateRole,
} from "../../controllers/admin/admin.controller";
import { validateUserAdmin } from "../../middlewares/validateUserAdmin";
import { Router } from "express";
import { createOneUser } from "../../controllers/auth.controller";

const router: Router = Router();

router.get("/get-all-users", validateUserAdmin, getAllUsers);

router.get("/get-one-user/:id", validateUserAdmin, getOneUser);

router.delete("/delete-one-user/:id", validateUserAdmin, deleteOneUser);

router.put("/update-user-role/:id", validateUserAdmin, updateRole);

router.put("/update-user-blocked/:id", validateUserAdmin, updateBlocked);

router.post("/create-one-user", validateUserAdmin, createOneUser)

export default router;
