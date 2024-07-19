"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dbConnection_1 = require("./dbConnection");
const telcoProviderSchemaFields = {
    name: { type: String, required: true, unique: true },
    ftpUrl: { type: String, required: true },
    localPath: { type: String, required: true },
    country: { type: String },
    schedule: { type: mongoose_1.Schema.Types.ObjectId, ref: 'schedulers', required: true },
};
const telcoProviderSchema = new mongoose_1.Schema(telcoProviderSchemaFields, {
    timestamps: true,
});
const TelcoProviderModel = dbConnection_1.dbConnect.model('TelcoProvider', telcoProviderSchema);
exports.default = TelcoProviderModel;
