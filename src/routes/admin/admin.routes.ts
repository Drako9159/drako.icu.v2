import { deleteOneUser, getAllUsers, getOneUser, updateRole } from "controllers/admin/admin.controller";
import { Router } from "express";
// import { register, login } from "../controllers/auth.controller";

const router: Router = Router();

router.get("/get-all-users", getAllUsers)

router.get("/get-one-user/:id", getOneUser)

router.delete("/delete-one-user", deleteOneUser)

router.put("/update-user-role/:id", updateRole);

router.put("/update-user-blocked/:id", updateRole)


export default router;
