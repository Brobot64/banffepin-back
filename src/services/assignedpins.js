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
exports.getPinsByOrderId = exports.getAssignedPinsById = void 0;
const mongoose_1 = require("mongoose");
const userhistory_1 = __importDefault(require("../models/userhistory"));
// Service to get assigned pins by assignment ID
const getAssignedPinsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the ID
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        // Find the UserPinAssignment document by its ID
        const assignedPins = yield userhistory_1.default.findById(id).exec();
        if (!assignedPins) {
            throw new Error(`No assigned pins found with ID: ${id}`);
        }
        return assignedPins;
    }
    catch (error) {
        throw new Error(`Failed to fetch assigned pins by ID: ${error.message}`);
    }
});
exports.getAssignedPinsById = getAssignedPinsById;
const getPinsByOrderId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assignedPins = yield userhistory_1.default.find({ orderid: id }).exec();
        if (!assignedPins) {
            throw new Error(`No assigned pins found with ID: ${id}`);
        }
        return assignedPins;
    }
    catch (error) {
        throw new Error(`Failed to fetch assigned pins by ID: ${error.message}`);
    }
});
exports.getPinsByOrderId = getPinsByOrderId;
