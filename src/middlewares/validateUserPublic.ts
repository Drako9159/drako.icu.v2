import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import handleError from "../utils/handleError";

export const validateUserPublic = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { access_token }: any = req.cookies;
    const tokenHeader: string = req.headers.authorization?.split(
      " "
    )[1] as string;
    
    let token = access_token ? access_token : tokenHeader;
    

    if (!token) {
      return handleError(res, 401, "CREDENTIALS_REQUIRED");
    }
    const auth: string | JwtPayload = jwt.verify(
      token,
      config.jwtSecret as string
    );
  } catch (error) {
    return handleError(res, 401, "ACCESS_DENIED");
  }
  next();
};
