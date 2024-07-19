import schedulerModel, { ISchedule } from "../models/scheduler";

// Create a new schedule
export const createSchedule = async (data: ISchedule): Promise<ISchedule> => {
    const newSchedule = new schedulerModel(data);
    return await newSchedule.save();
};

// Get all schedules
export const getAllSchedules = async (): Promise<any[]> => {
    return await schedulerModel.find().populate('user').exec();
};

// Get a schedule by ID
export const getScheduleById = async (id: string): Promise<ISchedule | null> => {
    return await schedulerModel.findById(id).populate('user').exec();
};

// Update a schedule by ID
export const updateScheduleById = async (id: string, data: Partial<ISchedule>): Promise<ISchedule | null> => {
    return await schedulerModel.findByIdAndUpdate(id, data, { new: true }).populate('user').exec();
};

// Delete a schedule by ID
export const deleteScheduleById = async (id: string): Promise<ISchedule | null> => {
    return await schedulerModel.findByIdAndDelete(id).populate('user').exec();
};
