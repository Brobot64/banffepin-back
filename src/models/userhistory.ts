import { Document, Schema } from 'mongoose';
import { dbConnect } from './dbConnection';

export interface IUserPinAssignment extends Document {
    userId: string;
    telco: string;
    denomination: string;
    pins: string[];
    assignedAt: Date;
    orderid: string;
}

const UserPinAssignmentSchema: Schema = new Schema({
    userId: { type: String, required: true },
    telco: { type: String, required: true },
    denomination: { type: String, required: true },
    pins: { type: [String], required: true },
    assignedAt: { type: Date, default: Date.now },
    orderid: { type: String }
});


const userpinsModel = dbConnect.model<IUserPinAssignment>('UserPinAssignment', UserPinAssignmentSchema);

export default userpinsModel;
