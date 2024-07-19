import mongoose, { Schema } from "mongoose";
import { dbConnect } from "./dbConnection";


export interface ISchedule {
    user: mongoose.Types.ObjectId;
    plan: string;
    timeString: string;
}


const schedulerSchemaFields: Record<keyof ISchedule, any> = {
    user: { type: String, ref: 'account' },
    plan: { type: String, required: true },
    timeString: { type: String, required: true },
}

const schedulerSchema: Schema = new Schema (
    schedulerSchemaFields, {
        timestamps: true,
    }
);

const schedulerModel =  dbConnect.model<ISchedule>("schedulers", schedulerSchema);

export default schedulerModel;