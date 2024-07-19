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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAvailableTelcosWithDenominations = exports.getEpinByIdController = exports.getEpinBySerialController = exports.getUnsoldEpinsController = exports.getSoldEpinsController = exports.placeOrderByUserController = exports.getOrdersByIdController = exports.getVendedByOrder = exports.getVended = exports.getAllEpins = void 0;
const efiles_1 = require("../services/efiles");
const vending_1 = require("../services/vending");
const assignedpins_1 = require("../services/assignedpins");
// Controller function to get all ePins or filter by query
const getAllEpins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const epins = yield (0, efiles_1.getEpins)();
        res.status(200).json(epins);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllEpins = getAllEpins;
// Controller function to get sold ePins
const getSoldEpinsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const soldEpins = yield (0, efiles_1.getSoldEpins)();
        res.status(200).json(soldEpins);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getSoldEpinsController = getSoldEpinsController;
// Controller function to get unsold ePins
const getUnsoldEpinsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unsoldEpins = yield (0, efiles_1.getUnsoldEpins)();
        res.status(200).json(unsoldEpins);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUnsoldEpinsController = getUnsoldEpinsController;
// Controller function to get ePin by serial
const getEpinBySerialController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serial } = req.params;
    try {
        const epin = yield (0, efiles_1.getEpinBySerial)(serial);
        if (epin) {
            res.status(200).json({
                epin
            });
        }
        else {
            res.status(404).json({ message: `ePin with serial ${serial} not found` });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getEpinBySerialController = getEpinBySerialController;
// Controller function to get ePin by id
const getEpinByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const epin = yield (0, efiles_1.getEpinById)(id);
        if (epin) {
            res.status(200).json({
                epin,
            });
        }
        else {
            res.status(404).json({ message: `ePin with id ${id} not found` });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getEpinByIdController = getEpinByIdController;
// Get orders by id
const getOrdersByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.params;
    try {
        const orders = yield (0, vending_1.getOrdersByUserId)(user);
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getOrdersByIdController = getOrdersByIdController;
const placeOrderByUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.params;
    try {
        const response = yield (0, efiles_1.assignEPinsToAgent)(user, req.body);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.placeOrderByUserController = placeOrderByUserController;
const fetchAvailableTelcosWithDenominations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, efiles_1.getAvailableTelcosWithDenominations)();
        return res.status(200).json({
            message: "Available telcos with denominations fetched successfully",
            data
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.fetchAvailableTelcosWithDenominations = fetchAvailableTelcosWithDenominations;
const getVended = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, assignedpins_1.getAssignedPinsById)(req.params.id);
        res.status(200).json(data);
    }
    catch (error) {
        return res.status(500).json({
            message: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.getVended = getVended;
const getVendedByOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, assignedpins_1.getPinsByOrderId)(req.params.order);
        res.status(200).json(data);
    }
    catch (error) {
        return res.status(500).json({
            message: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.getVendedByOrder = getVendedByOrder;
