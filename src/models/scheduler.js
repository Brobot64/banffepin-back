"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dbConnection_1 = require("./dbConnection");
const schedulerSchemaFields = {
    user: { type: String, ref: 'account' },
    plan: { type: String, required: true },
    timeString: { type: String, required: true },
};
const schedulerSchema = new mongoose_1.Schema(schedulerSchemaFields, {
    timestamps: true,
});
const schedulerModel = dbConnection_1.dbConnect.model("schedulers", schedulerSchema);
exports.default = schedulerModel;
