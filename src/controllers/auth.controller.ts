import { Request, Response } from "express";
import Auth from "../helpers/auth";
import handleError from "../utils/handleError";

export async function register(req: Request, res: Response) {
  try {
    const { email, password, firstName, lastName } = req.body;

    const fields = ["email", "password", "firstName", "lastName"].filter(
      (field) => !req.body[field]
    );

    if (fields.length > 0) {
      return handleError(res, 400, `require: [${fields.join(", ")}]`);
    }

    const auth = new Auth(email, password, firstName, lastName);

    if (await auth.findOneUser()) return handleError(res, 400, "USER_EXISTS");

    const user = await auth.register();

    return res.status(201).json({
      message: "SUCCESSFULLY_REGISTERED",
      ...user,
    });
  } catch (error) {
    console.log(error);
    return handleError(res);
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const fields = ["email", "password"].filter((field) => !req.body[field]);

    if (fields.length > 0) {
      return handleError(res, 400, `require: [${fields.join(", ")}]`);
    }
    const auth = new Auth(email, password);
    const user = await auth.login();
    if (user === "USER_NOT_FOUND") return handleError(res, 404, user);
    if (user === "USER_NOT_CONFIRMED") return handleError(res, 401, user);
    if (user === "INVALID_PASSWORD") return handleError(res, 401, user);
    if (user === "USER_BLOCKED") return handleError(res, 401, user);
    return res.status(200).json({ message: "SUCCESSFULLY_LOGIN", ...user });
  } catch (error) {
    return handleError(res);
  }
}
