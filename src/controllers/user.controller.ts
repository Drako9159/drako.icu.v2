import { Request, Response } from "express";
import handleErrorResponse from "../utils/handleErrorResponse";
import Users from "../helpers/user";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await Users.getAllUsers();
    return res.status(201).json({
      users,
    });
  } catch (error) {
    console.error(error);
    return handleErrorResponse(res);
  }
}
export async function getOneUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const users = await new Users(id);
    const user = await users.getOneUser();
    if (!user) return handleErrorResponse(res, 400, "User doesn't exist!");
    return res.status(201).json({
      user,
    });
  } catch (error) {
    console.error(error);
    return handleErrorResponse(res, 400, "User doesn't exist!");
  }
}

export async function deleteOneUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const users = await new Users(id);
    const user = await users.getAndDelete();
    return res.status(201).json({
      message: "User Deleted",
      users,
    });
  } catch (error) {
    console.error(error);
    return handleErrorResponse(res, 400, "User doesn't exist!");
  }
}

export async function updateOneUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { firstName, lastName, type } = req.body;

    if (type !== "user" && type !== "admin")
      return handleErrorResponse(res, 400, "Type only accept user or admin!");

    const users = await new Users(id, firstName, lastName, type);
    const user = await users.getAndUpdate();

    return res.status(201).json({
      message: "User Updated",
      user,
    });
  } catch (error) {
    console.error(error);
    return handleErrorResponse(res, 400, "User doesn't exist!");
  }
}
