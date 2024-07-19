import { Schema } from "mongoose";
import { dbConnect } from "./dbConnection";


export interface IE_Pin {
    denomination: string;
    pin: string;
    telco: string;
    country: string;
    serial: string;
    isSold: boolean;
}

const epinSchemaFields: Record<keyof IE_Pin, any> = {
    denomination: { type: String, required: true },
    pin: { type: String, required: true, unique: true },
    telco: { type: String, required: true },
    serial: { type: String, unique: true },
    country: { type: String, required: true },
    isSold: { type: Boolean, default: false }
}

const epinSchema: Schema = new Schema (
    epinSchemaFields, {
        timestamps: true,
    }
)

const epinModel = dbConnect.model<IE_Pin>("epin", epinSchema);

export default epinModel;




