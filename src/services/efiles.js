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
exports.getAvailableTelcosWithDenominations = exports.assignEPinsToAgent = exports.getEpinById = exports.getEpinBySerial = exports.getUnsoldEpins = exports.getSoldEpins = exports.getEpins = exports.uploadEPinFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const encryptions_1 = require("../utils/encryptions");
const epin_1 = __importDefault(require("../models/epin"));
const vends_1 = __importDefault(require("../models/vends"));
const userhistory_1 = __importDefault(require("../models/userhistory"));
function removeFirstLast(arr) {
    return arr.slice(1, arr.length - 2);
}
const uploadEPinFiles = (filePath, telco, country) => __awaiter(void 0, void 0, void 0, function* () {
    const fileContent = fs_1.default.readFileSync(filePath, 'utf-8');
    const lints = fileContent.split('\n');
    const lines = removeFirstLast(lints);
    for (const line of lines) {
        const [epin, serial, nums, zers, date] = line.split(',');
        const salted = (0, encryptions_1.encrypt)(epin);
        const denomination = parseInt(nums.trim());
        yield epin_1.default.create({
            denomination,
            pin: salted,
            telco,
            serial,
            country
        });
    }
    return { message: "Data Uploaded" };
});
exports.uploadEPinFiles = uploadEPinFiles;
// Service to get all ePins or filter by query
const getEpins = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (query = {}) {
    try {
        const epins = yield epin_1.default.find(query).exec();
        return epins.map(epin => (Object.assign(Object.assign({}, epin.toObject()), { pin: (0, encryptions_1.decrypt)(epin.pin) })));
    }
    catch (error) {
        throw new Error(`Failed to fetch ePins: ${error.message}`);
    }
});
exports.getEpins = getEpins;
// Service to get sold ePins
const getSoldEpins = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.getEpins)({ isSold: true });
});
exports.getSoldEpins = getSoldEpins;
// Service to get unsold ePins
const getUnsoldEpins = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.getEpins)({ isSold: false });
});
exports.getUnsoldEpins = getUnsoldEpins;
// Service to get ePin by serial
const getEpinBySerial = (serial) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const epin = yield epin_1.default.findOne({ serial }).exec();
        if (epin) {
            return Object.assign(Object.assign({}, epin.toObject()), { pin: (0, encryptions_1.decrypt)(epin.pin) });
        }
        return null;
    }
    catch (error) {
        throw new Error(`Failed to fetch ePin by serial: ${error.message}`);
    }
});
exports.getEpinBySerial = getEpinBySerial;
// Service to get ePin by id
const getEpinById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const epin = yield epin_1.default.findById(id).exec();
        if (epin) {
            return Object.assign(Object.assign({}, epin.toObject()), { pin: (0, encryptions_1.decrypt)(epin.pin) });
        }
        return null;
    }
    catch (error) {
        throw new Error(`Failed to fetch ePin by id: ${error.message}`);
    }
});
exports.getEpinById = getEpinById;
const assignEPinsToAgent = (agentId, cart) => __awaiter(void 0, void 0, void 0, function* () {
    const epinsToAssign = {};
    for (const item of cart) {
        const { denomination, quantity, telco } = item;
        const pins = yield epin_1.default.find({ denomination, telco, isSold: false }).limit(quantity);
        if (pins.length < quantity) {
            throw new Error(`Not enough E-Pins available for denomination ${denomination} and telco ${telco}`);
        }
        const pinNumbers = pins.map(pin => (0, encryptions_1.decrypt)(pin.pin)); //pin.pin);
        if (!epinsToAssign[telco]) {
            epinsToAssign[telco] = { pins: [], denomination: denomination.toString() };
        }
        epinsToAssign[telco].pins.push(...pinNumbers);
        yield epin_1.default.updateMany({ _id: { $in: pins.map(pin => pin._id) } }, { $set: { isSold: true } });
        const newOrder = new vends_1.default({ userId: agentId, cart });
        const savedOrder = yield newOrder.save();
        // Save the assigned pins
        const userPinAssignment = new userhistory_1.default({
            userId: agentId,
            telco,
            denomination: denomination.toString(),
            pins: epinsToAssign,
            assignedAt: new Date(),
            orderid: savedOrder._id
        });
        yield userPinAssignment.save();
    }
    return epinsToAssign;
});
exports.assignEPinsToAgent = assignEPinsToAgent;
const getAvailableTelcosWithDenominations = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unsoldPins = yield epin_1.default.find({ isSold: false }, 'denomination telco').lean();
        const telcosWithDenominations = {};
        unsoldPins.forEach(pin => {
            if (!telcosWithDenominations[pin.telco]) {
                telcosWithDenominations[pin.telco] = new Set();
            }
            telcosWithDenominations[pin.telco].add(pin.denomination);
        });
        const result = Object.entries(telcosWithDenominations).map(([telco, denominations]) => ({
            telco,
            denominations: Array.from(denominations)
        }));
        return result;
    }
    catch (error) {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getAvailableTelcosWithDenominations = getAvailableTelcosWithDenominations;
