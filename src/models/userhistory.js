"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dbConnection_1 = require("./dbConnection");
const UserPinAssignmentSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    telco: { type: String, required: true },
    denomination: { type: String, required: true },
    pins: { type: [String], required: true },
    assignedAt: { type: Date, default: Date.now },
    orderid: { type: String }
});
const userpinsModel = dbConnection_1.dbConnect.model('UserPinAssignment', UserPinAssignmentSchema);
exports.default = userpinsModel;
