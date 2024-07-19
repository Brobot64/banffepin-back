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
exports.resendNewToken = exports.verifySentToken = exports.sendToken = void 0;
const token_1 = __importDefault(require("../services/token"));
const handleResponse_1 = require("../utils/handleResponse");
const sendToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone_number } = req.body;
        const response = yield token_1.default.createToken(phone_number);
        return (0, handleResponse_1.successResponse)(res, 201, response);
    }
    catch (error) {
        return (0, handleResponse_1.errorResponse)(res, 500, error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.sendToken = sendToken;
const verifySentToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, token } = req.params;
        const response = yield token_1.default.verifyToken(phone, token);
        return (0, handleResponse_1.successResponse)(res, 200, response);
    }
    catch (error) {
        return (0, handleResponse_1.errorResponse)(res, 500, error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.verifySentToken = verifySentToken;
const resendNewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone } = req.params;
        const response = yield token_1.default.resendToken(phone);
        return (0, handleResponse_1.successResponse)(res, 200, response);
    }
    catch (error) {
        return (0, handleResponse_1.errorResponse)(res, 500, error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.resendNewToken = resendNewToken;
