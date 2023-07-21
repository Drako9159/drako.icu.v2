import { Request, Response } from "express"
import handleErrorResponse from "../utils/handleError"

export function error404(req: Request, res: Response){
    try{
        return res.status(404).json({
            message: "Error 404 - Page Not Found"
        })
    } catch (error){
        return handleErrorResponse(res);
    }
}