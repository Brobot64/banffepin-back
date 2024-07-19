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
exports.deleteScheduleById = exports.updateScheduleById = exports.getScheduleById = exports.getAllSchedules = exports.createSchedule = void 0;
const scheduler_1 = __importDefault(require("../models/scheduler"));
// Create a new schedule
const createSchedule = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newSchedule = new scheduler_1.default(data);
    return yield newSchedule.save();
});
exports.createSchedule = createSchedule;
// Get all schedules
const getAllSchedules = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield scheduler_1.default.find().populate('user').exec();
});
exports.getAllSchedules = getAllSchedules;
// Get a schedule by ID
const getScheduleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield scheduler_1.default.findById(id).populate('user').exec();
});
exports.getScheduleById = getScheduleById;
// Update a schedule by ID
const updateScheduleById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield scheduler_1.default.findByIdAndUpdate(id, data, { new: true }).populate('user').exec();
});
exports.updateScheduleById = updateScheduleById;
// Delete a schedule by ID
const deleteScheduleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield scheduler_1.default.findByIdAndDelete(id).populate('user').exec();
});
exports.deleteScheduleById = deleteScheduleById;
