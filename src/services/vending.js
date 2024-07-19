"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrdersByUserId = void 0;
const vends_1 = __importDefault(require("../models/vends"));
// Get orders by userId
const getOrdersByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield vends_1.default.find({ userId }).exec();
        return orders;
    }
    catch (error) {
        throw new Error(`Failed to fetch orders by userId: ${error.message}`);
    }
});
exports.getOrdersByUserId = getOrdersByUserId;
// Update an order by orderId
const updateOrder = (orderId, updatedOrder) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield vends_1.default.findByIdAndUpdate(orderId, updatedOrder, { new: true }).exec();
        return order;
    }
    catch (error) {
        throw new Error(`Failed to update order: ${error.message}`);
    }
});
exports.updateOrder = updateOrder;
// Delete an order by orderId
const deleteOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield vends_1.default.findByIdAndDelete(orderId).exec();
    }
    catch (error) {
        throw new Error(`Failed to delete order: ${error.message}`);
    }
});
exports.deleteOrder = deleteOrder;
