import {
  deleteOneUser,
  getAllUsers,
  getOneUser,
  updateBlocked,
  updateRole,
} from "../../controllers/admin/admin.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/get-all-users", getAllUsers);

router.get("/get-one-user/:id", getOneUser);

router.delete("/delete-one-user/:id", deleteOneUser);

router.put("/update-user-role/:id", updateRole);

router.put("/update-user-blocked/:id", updateBlocked);

export default router;
