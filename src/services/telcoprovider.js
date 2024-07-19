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
exports.deleteTelcoProviderById = exports.updateTelcoProviderById = exports.getTelcoProviderById = exports.getAllTelcoProviders = exports.createTelcoProvider = void 0;
const telcoproviders_1 = __importDefault(require("../models/telcoproviders"));
// Create a new telco provider
const createTelcoProvider = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newTelcoProvider = new telcoproviders_1.default(data);
    return yield newTelcoProvider.save();
});
exports.createTelcoProvider = createTelcoProvider;
// Get all telco providers
const getAllTelcoProviders = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (filters.country) {
        query.country = filters.country;
    }
    if (filters.name) {
        query.name = filters.name;
    }
    return yield telcoproviders_1.default.find(query).populate('schedule').exec();
});
exports.getAllTelcoProviders = getAllTelcoProviders;
// Get a telco provider by ID
const getTelcoProviderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield telcoproviders_1.default.findById(id).populate('schedule').exec();
});
exports.getTelcoProviderById = getTelcoProviderById;
// Update a telco provider by ID
const updateTelcoProviderById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield telcoproviders_1.default.findByIdAndUpdate(id, data, { new: true }).populate('schedule').exec();
});
exports.updateTelcoProviderById = updateTelcoProviderById;
// Delete a telco provider by ID
const deleteTelcoProviderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield telcoproviders_1.default.findByIdAndDelete(id).populate('schedule').exec();
});
exports.deleteTelcoProviderById = deleteTelcoProviderById;
