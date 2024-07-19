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
exports.deleteTelcoProvider = exports.updateTelcoProvider = exports.getOneTelcoProvider = exports.getTelcoScron = exports.addTelcoScron = void 0;
const telcoprovider_1 = require("../services/telcoprovider");
const handleResponse_1 = require("../utils/handleResponse");
const addTelcoScron = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, telcoprovider_1.createTelcoProvider)(req.body);
        return (0, handleResponse_1.successResponse)(res, 201, response);
    }
    catch (error) {
        return (0, handleResponse_1.errorResponse)(res, 500, error.message);
    }
});
exports.addTelcoScron = addTelcoScron;
const getTelcoScron = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = {
            country: req.query.country,
            name: req.query.name
        };
        const response = yield (0, telcoprovider_1.getAllTelcoProviders)(filters);
        return (0, handleResponse_1.successResponse)(res, 200, response);
    }
    catch (error) {
        return (0, handleResponse_1.errorResponse)(res, 500, error.message);
    }
});
exports.getTelcoScron = getTelcoScron;
const getOneTelcoProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const response = yield (0, telcoprovider_1.getTelcoProviderById)(id);
        return (0, handleResponse_1.successResponse)(res, 200, response);
    }
    catch (error) {
        return (0, handleResponse_1.errorResponse)(res, 500, error.message);
    }
});
exports.getOneTelcoProvider = getOneTelcoProvider;
const updateTelcoProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, telcoprovider_1.updateTelcoProviderById)(req.params.id, req.body);
        return (0, handleResponse_1.successResponse)(res, 203, response);
    }
    catch (error) {
        return (0, handleResponse_1.errorResponse)(res, 500, error.message);
    }
});
exports.updateTelcoProvider = updateTelcoProvider;
const deleteTelcoProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, telcoprovider_1.deleteTelcoProviderById)(req.params.id);
        return (0, handleResponse_1.successResponse)(res, 201, response);
    }
    catch (error) {
        return (0, handleResponse_1.errorResponse)(res, 500, error.message);
    }
});
exports.deleteTelcoProvider = deleteTelcoProvider;
