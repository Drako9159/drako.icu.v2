import { Request, Response } from "express";
import handleError from "../utils/handleError";
import Users from "../helpers/user";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await Users.getAllUsers();
    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

export async function getOneUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const users = await new Users(id);
    const user = await users.getOneUser();
    if (user === "USER_NOT_FOUND") return handleError(res, 404, user);
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

export async function deleteOneUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const users = await new Users(id);
    const user = await users.getAndDelete();
    if (user === "USER_NOT_FOUND") return handleError(res, 404, user);
    return res.status(204).json({
      message: "USER_DELETED",
      users,
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

export async function updateOneUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { firstName, lastName } = req.body;
    const users = await new Users(id, firstName, lastName);
    const user = await users.getAndUpdate();
    if (user === "USER_NOT_FOUND") return handleError(res, 404, user);
    return res.status(200).json({
      message: "User Updated",
      user,
    });
  } catch (error) {
    console.error(error);
    return handleError(res, 400, "User doesn't exist!");
  }
}
