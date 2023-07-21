import { Request, Response } from "express";
import handleError from "../../utils/handleError";
// import Users from "../helpers/user";


export async function updateOneUser(req: Request, res: Response) {
  try {
    // const id = req.params.id;
    // const { firstName, lastName } = req.body;
    
    // if (type !== "user" && type !== "admin")
    //   return handleError(res, 400, "Type only accept user or admin!");

    // const users = await new Users(id, firstName, lastName);
    // const user = await users.getAndUpdate();

    return res.status(200).json({
      message: "User Updated"
    });
  } catch (error) {
    console.error(error);
    return handleError(res, 400, "User doesn't exist!");
  }
}
