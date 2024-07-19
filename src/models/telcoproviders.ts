import mongoose, { Schema } from 'mongoose';
import { dbConnect } from "./dbConnection";

export interface ITelcoProvider {
    name: string;
    ftpUrl: string;
    localPath: string;
    country: string;
    schedule: mongoose.Types.ObjectId;
}

const telcoProviderSchemaFields: Record<keyof ITelcoProvider, any> = {
    name: { type: String, required: true, unique: true },
    ftpUrl: { type: String, required: true },
    localPath: { type: String, required: true },
    country: { type: String },
    schedule: { type: Schema.Types.ObjectId, ref: 'schedulers', required: true },
};

const telcoProviderSchema: Schema = new Schema(telcoProviderSchemaFields, {
    timestamps: true,
});

const TelcoProviderModel = dbConnect.model<ITelcoProvider>('TelcoProvider', telcoProviderSchema);

export default TelcoProviderModel;
