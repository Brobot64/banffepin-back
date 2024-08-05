import { Request, Response } from "express";
import { addTransactionPin, hasTransactionPin, loginAccount, signUpAccount, updatePassword, updateProfile, userInfo } from "../services/account";
import { errorResponse, successResponse } from "../utils/handleResponse";


export const createAccount = async (req:Request, res:Response) => {
    try {
        const body = req.body;
        const response = await signUpAccount(body);
        return successResponse(res, 201, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);   
    }
}

export const signInAccount = async (req:Request, res:Response) => {
    try {
        const body = req.body;
        const response = await loginAccount(body);
        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}


export const updateProfileController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id; // Assuming the userId is passed as a URL parameter
        const body = req.body;
        const response = await updateProfile(userId, body);
        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}

export const updatePasswordController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id; // Assuming the userId is passed as a URL parameter
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const response = await updatePassword(userId, oldPassword, newPassword, confirmNewPassword);
        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}



export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const response = await userInfo(req.params.token);
        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}

export const checkTransactionPin = async (req: Request, res: Response)  => {
    try {
        const response = await hasTransactionPin(req.params.user);
        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}

export const addTransactPin = async (req: Request, res: Response)  => {
    try {
        // @ts-ignore
        const { id } = req.user;
        const response = await addTransactionPin(id, req.body);
        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message);
    }
}