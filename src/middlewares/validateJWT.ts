import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken: any =
      req.header("authorization") || req.query.accessToken;
    if (!accessToken) {
      return res.status(400).json({
        message: "Access denied, you need a token to access to this route",
      });
    }
    const auth: string | JwtPayload = jwt.verify(
      accessToken,
      config.jwtSecret as string
    );
    const role = (auth as { role: string }).role;
    if (role !== "admin") {
      return res.status(400).json({
        message: "Access denied, you need an admin user",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Access denied, token expired or incorrect",
    });
  }
  next();
};
