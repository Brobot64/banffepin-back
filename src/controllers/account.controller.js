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
exports.getUserInfo = exports.updatePasswordController = exports.updateProfileController = exports.signInAccount = exports.createAccount = void 0;
const account_1 = require("../services/account");
const handleResponse_1 = require("../utils/handleResponse");
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const response = yield (0, account_1.signUpAccount)(body);
        return (0, handleResponse_1.successResponse)(res, 201, response);
    }
    catch (error) {
        return (0, handleResponse_1.errorResponse)(res, 500, error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.createAccount = createAccount;
const signInAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const response = yield (0, account_1.loginAccount)(body);
        return (0, handleResponse_1.successResponse)(res, 200, response);
    }
    catch (error) {
        return (0, handleResponse_1.errorResponse)(res, 500, error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.signInAccount = signInAccount;
const updateProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id; // Assuming the userId is passed as a URL parameter
        const body = req.body;
        const response = yield (0, account_1.updateProfile)(userId, body);
        return (0, handleResponse_1.successResponse)(res, 200, response);
    }
    catch (error) {
        return (0, handleResponse_1.errorResponse)(res, 500, error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.updateProfileController = updateProfileController;
const updatePasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id; // Assuming the userId is passed as a URL parameter
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const response = yield (0, account_1.updatePassword)(userId, oldPassword, newPassword, confirmNewPassword);
        return (0, handleResponse_1.successResponse)(res, 200, response);
    }
    catch (error) {
        return (0, handleResponse_1.errorResponse)(res, 500, error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.updatePasswordController = updatePasswordController;
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, account_1.userInfo)(req.params.token);
        return (0, handleResponse_1.successResponse)(res, 200, response);
    }
    catch (error) {
        return (0, handleResponse_1.errorResponse)(res, 500, error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getUserInfo = getUserInfo;
