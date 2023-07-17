import { Response, Request } from "express";
export default function handleErrorResponse(
  res: Response,
  code: number = 500,
  message: string = "Error 500 - Internal Server Error"
): Response {
  return res.status(code).json({ message });
}
