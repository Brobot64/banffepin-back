"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dbConnection_1 = require("./dbConnection");
const orderSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    cart: [{
            denomination: { type: Number, required: true },
            quantity: { type: Number, required: true },
            telco: { type: String, required: true }
        }]
}, { timestamps: true });
const Order = dbConnection_1.dbConnect.model('order', orderSchema);
exports.default = Order;
