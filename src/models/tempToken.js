"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dbConnection_1 = require("./dbConnection");
const tempTokenSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 12000 } // 300 seconds = 5 minutes
});
const TempToken = dbConnection_1.dbConnect.model('TempToken', tempTokenSchema);
exports.default = TempToken;
