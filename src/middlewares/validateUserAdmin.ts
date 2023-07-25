import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import handleError from "../utils/handleError";

export const validateUserAdmin = (
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
    const role = (auth as { role: string }).role;
    if (role !== "admin") {
      return handleError(res, 401, "HIGH_PERMITS_ARE_REQUIRED");
    }
  } catch (error) {
    return res.status(401).json({
      message: "ACCESS_DENIED",
    });
  }
  next();
};
