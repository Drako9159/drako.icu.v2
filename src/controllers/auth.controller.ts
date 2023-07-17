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
    const auth = new Auth(email, password, firstName, lastName);
    if (await auth.findOneUser())
      return handleErrorResponse(res, 400, "Error 400 - User Is Registered!!");

    const user = await auth.register();
    return res.status(201).json({
      message: "Successfully register!",
      ...user,
    });
  } catch (error) {
    console.log(error);
    return handleErrorResponse(res);
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const auth = new Auth(email, password);
    const user = await auth.login();
    if (user === "Wrong email!!")
      return handleErrorResponse(
        res,
        400,
        "The email address entered is not registered!"
      );
    if (user == "Wrong password!!")
      return handleErrorResponse(
        res,
        400,
        "The password entered is not valid!"
      );
    return res
      .status(201)
      .json({ message: "Successfully authentication", ...user });
  } catch (error) {
    return handleErrorResponse(res);
  }
}
