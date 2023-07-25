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
    const { token }: any = req.cookies;
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
