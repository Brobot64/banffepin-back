import mongoose, { Schema } from "mongoose";
import { dbConnect } from "./dbConnection";


export interface IApi_Key {
    user: mongoose.Types.ObjectId | string;
    key: string;
}

const apiKeySchemaFields: Record<keyof IApi_Key, any> = {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "account" },
    key: { type: String, required: true }
}

const apiKeySchema: Schema = new Schema (
    apiKeySchemaFields, {
        timestamps: true,
    }
)


const apiKeyModel = dbConnect.model<IApi_Key>("apikey", apiKeySchema);

export default apiKeyModel;