import { Request, Response } from "express";
import Auth from "../helpers/auth";
import handleErrorResponse from "../utils/handleErrorResponse";

export async function register(req: Request, res: Response) {
  try {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password || !firstName || !lastName)
      return handleErrorResponse(
        res,
        400,
        "Error 400 - Please Fill Elements!!"
      );
    const user = new Auth(email, password, firstName, lastName);
    if (await user.findOneUser())
      return handleErrorResponse(res, 400, "Error 400 - User Is Registered!!");

    const register = await user.register();
    return res.status(201).json({
      firstName,
      lastName,
      email,
      jwt: register,
    });
  } catch (error) {
    console.log(error);
    return handleErrorResponse(res);
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = new Auth(email, password);
    const login = await user.login();

    if (login === "Wrong email!!")
      return handleErrorResponse(
        res,
        400,
        "The email address entered is not registered!"
      );
    if (login == "Wrong password!!")
      return handleErrorResponse(
        res,
        400,
        "The password entered is not valid!"
      );
    return res
      .status(201)
      .json({ message: "Successfully authentication", jwt: login });
  } catch (error) {
    return handleErrorResponse(res);
  }
}