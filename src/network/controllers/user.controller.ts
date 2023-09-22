import { Request, Response } from "express";
import handleError from "../../utils/handleError";
import PublicUserService from "../../service/PublicUserService";

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
