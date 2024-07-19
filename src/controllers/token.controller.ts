import { Request, Response } from "express";
import TokenService from "../services/token";
import { errorResponse, successResponse } from "../utils/handleResponse";


export const sendToken = async (req: Request, res: Response) => {
    try {
        const { phone_number } = req.body;
        const response = await TokenService.createToken(phone_number);

        return successResponse(res, 201, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);   
    }
}

export const verifySentToken = async (req: Request, res: Response) => {
    try {
       const { phone, token } = req.params;
       const response = await TokenService.verifyToken(phone, token);

       return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}

export const resendNewToken = async (req: Request, res:Response) => {
    try {
        const { phone } = req.params;
        const response = await TokenService.resendToken(phone);

        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}