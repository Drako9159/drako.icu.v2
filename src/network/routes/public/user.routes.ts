import { Router } from "express";

import {
  createOneTokenPasswordReset,
  updateOneConfirmed,
  getOneUser,
  updateOneUser,
} from "../../controllers/user.controller";

const router: Router = Router();

router.get("/get-one-user/:id", getOneUser);

router.put("/update-one-user/:id", updateOneUser);

router.put("/create-token-password/:email", createOneTokenPasswordReset);

router.put("/user-confirm/:token", updateOneConfirmed);

export default router;
