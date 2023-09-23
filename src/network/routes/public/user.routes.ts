import { Router } from "express";
import { validateUserPublic } from "../../../middlewares/validateUserPublic";
import {
  createOneTokenPasswordReset,
  updateOneConfirmed,
  getOneUser,
  updateOneUser,
} from "../../controllers/user.controller";

const router: Router = Router();

router.get("/get-one-user/:id", validateUserPublic, getOneUser);

router.put("/update-one-user/:id", validateUserPublic, updateOneUser);

router.put("/create-token-password/:email", createOneTokenPasswordReset);

router.put("/user-confirm/:token", updateOneConfirmed);

export default router;
