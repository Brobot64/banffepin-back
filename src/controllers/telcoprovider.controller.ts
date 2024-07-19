import { Request, Response } from "express";
import { createTelcoProvider, deleteTelcoProviderById, getAllTelcoProviders, getTelcoProviderById, updateTelcoProviderById } from "../services/telcoprovider";
import { errorResponse, successResponse } from "../utils/handleResponse";


export const addTelcoScron = async (req: Request, res: Response) => {
    try {
        const response = await createTelcoProvider(req.body);
        return successResponse(res, 201, response);
    } catch (error: any) {
        return errorResponse(res, 500, error.message)
    }
}

export const getTelcoScron = async (req: Request, res: Response) => {
    try {
        const filters = {
            country: req.query.country as string,
            name: req.query.name as string
        };
        const response = await getAllTelcoProviders(filters);

        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error.message)
    }
}

export const getOneTelcoProvider = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const response = await getTelcoProviderById(id);
        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error.message)
    }
}

export const updateTelcoProvider = async (req: Request, res: Response) => {
    try {
        const response = await updateTelcoProviderById(req.params.id, req.body);
        return successResponse(res, 203, response);
    } catch (error: any) {
        return errorResponse(res, 500, error.message)
    }
}

export const deleteTelcoProvider = async (req: Request, res: Response) => {
    try {
        const response = await deleteTelcoProviderById(req.params.id);
        return successResponse(res, 201, response);
    } catch (error: any) {
        return errorResponse(res, 500, error.message)
    }
}