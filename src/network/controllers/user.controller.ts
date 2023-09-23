import { Request, Response } from "express";
import handleError from "../../utils/handleError";
import PublicUserService from "../../service/PublicUserService";
import AdminUserService from "../../service/AdminUserService";
import AuthService from "../../service/AuthService";

// Public
export async function getOneUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const users = new PublicUserService(id);
    const user = await users.getUser();
    if (user === "USER_NOT_FOUND") return handleError(res, 404, user);
    return res.status(200).json({
      user,
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
    const service = new PublicUserService(id, firstName, lastName);
    const user = await service.updateUser();
    if (user === "USER_NOT_FOUND") return handleError(res, 404, user);

    return res.status(200).json({
      message: "USER_UPDATED",
      user,
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

// genera el token en la base de datos
// aqui se debería enviar el token por email
export async function createOneTokenPasswordReset(req: Request, res: Response) {
  try {
    const email = req.params.email;
    if (!email) return handleError(res, 400, "require: string [email]");
    const publicUserService = new PublicUserService();
    const token = await publicUserService.createTokenPasswordReset(email);

    if (token === "USER_NOT_FOUND") return handleError(res, 404, token);
    return res.status(200).json({
      message: token,
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

// confirma que el token del email seal el mismo en la base de datos
// si se valida el token, el usuario se confirma
export async function updateOneConfirmed(req: Request, res: Response) {
  try {
    const token = req.params.token;
    if (!token) return handleError(res, 400, "require: string [token]");
    const publicUserService = new PublicUserService();
    const user = await publicUserService.updateConfirmed(token);
    if (user === "USER_NOT_FOUND") return handleError(res, 404, user);
    if (user === "FAIL_VALIDATION") return handleError(res, 401, user);
    return res.status(200).json({
      message: "CONFIRMED_UPDATED",
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

// Admin

export async function getAllUsers(req: Request, res: Response) {
  try {
    const adminUserService = new AdminUserService();
    const users = await adminUserService.getUsers();
    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

export async function deleteOneUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const adminUserService = new AdminUserService(id);
    const user = await adminUserService.deleteUser();
    if (user === "USER_NOT_FOUND") return handleError(res, 404, user);
    return res.status(204).json({
      message: "USER_DELETED",
      adminUserService,
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
    const adminUserService = new AdminUserService(id);
    const user = await adminUserService.updateRole(role);
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
    const adminUserService = new AdminUserService(id);
    const user = await adminUserService.updateBlocked(blocked);
    if (user === "USER_NOT_FOUND") return handleError(res, 404, user);
    return res.status(200).json({
      message: "BLOCKED_UPDATED",
      user
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

export async function getUserFull(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const adminUserService = new AdminUserService(id);
    const user = await adminUserService.getUserFull();
    if (user === "USER_NOT_FOUND") return handleError(res, 404, user);
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);
    return handleError(res);
  }
}

export async function createOneUser(req: Request, res: Response) {
  try {
    const { email, password, firstName, lastName } = req.body;
    const fields = ["email", "password", "firstName", "lastName"].filter(
      (field) => !req.body[field]
    );
    if (fields.length > 0) {
      return handleError(res, 400, `require: [${fields.join(", ")}]`);
    }
    const authService = new AuthService(email, password, firstName, lastName);
    const user = await authService.register();
    if (user === "USER_EXISTS") return handleError(res, 400, user);
    return res.status(201).json({ message: "USER_CREATED", ...user });
  } catch (error) {
    console.log(error);
    return handleError(res);
  }
}
