import { Request, Response } from "express";
import handleError from "../../utils/handleError";
import UserService from "../../helpers/user/UserService";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await UserService.getUsers();
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
    const users = new UserService(id);
    const user = await users.getUserFull();
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
    const users = new UserService(id);
    const user = await users.deleteUser();
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

export async function updateRole(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { role } = req.body;
    if (!role) return handleError(res, 400, "require: string [role]");
    if (role !== "public" && role !== "admin")
      return handleError(res, 400, "enum: [public, admin]");
    const service = new UserService(id);
    const user = await service.updateRole(role);
    if (user === "USER_NOT_FOUND") return handleError(res, 404, user);
    return res.status(200).json({
      message: "ROLE_UPDATED",
      user,
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

export async function updateBlocked(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { blocked } = req.body;
    if (blocked === null)
      return handleError(res, 400, "require: boolean [blocked]");
    if (blocked !== true && blocked !== false)
      return handleError(res, 400, "boolean: [true, false]");
    const service = new UserService(id);
    const user = await service.updateBlocked(blocked);
    if (user === "USER_NOT_FOUND") return handleError(res, 404, user);
    return res.status(200).json({
      message: "BLOCKED_UPDATED",
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}
