import { Request, Response } from "express";
import { createSchedule, deleteScheduleById, getAllSchedules, updateScheduleById } from "../services/schedulers";
import { errorResponse, successResponse } from "../utils/handleResponse";

export const timeToCron = (timeString: string): string => {
    const [hour, minute] = timeString.split(':').map(Number);

    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        throw new Error('Invalid time format');
    }

    return `${minute} ${hour} * * *`;
}

export const dateTimeToCron = (mins: string): string => {
    // */2 * * * *'
    return `*/${mins} * * * *`
};


export const createNewSchedule = async (req: Request, res: Response) => {
    try {
        const response = await createSchedule(req.body);
        return successResponse(res, 201, response);
    } catch (error: any) {
        return errorResponse(res, 500, error.message)
    }
}

export const getSchedules = async (req: Request, res: Response) => {
    try {
        const response = await getAllSchedules();
        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error.message)
    }
}

export const removeSchedule = async (req: Request, res: Response) => {
    try {
        const response = await deleteScheduleById(req.params.id)
        return successResponse(res, 200, response);
    } catch (error: any) {
        return errorResponse(res, 500, error.message)
    }
}

export const updateSchedule = async (req: Request, res: Response) => {
    try {
        const response = await updateScheduleById(req.params.id, req.body);
        return successResponse(res, 201, response);
    } catch (error: any) {
        return errorResponse(res, 500, error.message)
    }
}