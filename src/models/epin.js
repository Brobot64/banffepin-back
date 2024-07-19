"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dbConnection_1 = require("./dbConnection");
const epinSchemaFields = {
    denomination: { type: String, required: true },
    pin: { type: String, required: true, unique: true },
    telco: { type: String, required: true },
    serial: { type: String, unique: true },
    country: { type: String, required: true },
    isSold: { type: Boolean, default: false }
};
const epinSchema = new mongoose_1.Schema(epinSchemaFields, {
    timestamps: true,
});
const epinModel = dbConnection_1.dbConnect.model("epin", epinSchema);
exports.default = epinModel;
