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
exports.updateSchedule = exports.removeSchedule = exports.getSchedules = exports.createNewSchedule = exports.dateTimeToCron = exports.timeToCron = void 0;
const schedulers_1 = require("../services/schedulers");
const handleResponse_1 = require("../utils/handleResponse");
const timeToCron = (timeString) => {
    const [hour, minute] = timeString.split(':').map(Number);
    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        throw new Error('Invalid time format');
    }
    return `${minute} ${hour} * * *`;
};
exports.timeToCron = timeToCron;
const dateTimeToCron = (mins) => {
    // */2 * * * *'
    return `*/${mins} * * * *`;
};
exports.dateTimeToCron = dateTimeToCron;
const createNewSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, schedulers_1.createSchedule)(req.body);
        return (0, handleResponse_1.successResponse)(res, 201, response);
    }
    catch (error) {
        return (0, handleResponse_1.errorResponse)(res, 500, error.message);
    }
});
exports.createNewSchedule = createNewSchedule;
const getSchedules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, schedulers_1.getAllSchedules)();
        return (0, handleResponse_1.successResponse)(res, 200, response);
    }
    catch (error) {
        return (0, handleResponse_1.errorResponse)(res, 500, error.message);
    }
});
exports.getSchedules = getSchedules;
const removeSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, schedulers_1.deleteScheduleById)(req.params.id);
        return (0, handleResponse_1.successResponse)(res, 200, response);
    }
    catch (error) {
        return (0, handleResponse_1.errorResponse)(res, 500, error.message);
    }
});
exports.removeSchedule = removeSchedule;
const updateSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, schedulers_1.updateScheduleById)(req.params.id, req.body);
        return (0, handleResponse_1.successResponse)(res, 201, response);
    }
    catch (error) {
        return (0, handleResponse_1.errorResponse)(res, 500, error.message);
    }
});
exports.updateSchedule = updateSchedule;
