import { Router } from "express";
import { createOneTokenPasswordReset, updateOneConfirmed, updateOneUser } from "../controllers/user.controller";

const router: Router = Router();

// router.get("/", getAllUsers);

// router.get("/:id", getOneUser)

// router.delete("/:id", deleteOneUser);

router.put("/update-one-user/:id", updateOneUser)

router.put("/create-token-password/:email", createOneTokenPasswordReset)

router.put("/user-confirm/:token", updateOneConfirmed)


export default router;
