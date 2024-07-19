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
exports.userInfo = exports.updatePassword = exports.updateProfile = exports.loginAccount = exports.signUpAccount = void 0;
const account_1 = __importDefault(require("../models/account"));
const encryptions_1 = require("../utils/encryptions");
const signUpAccount = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, name, gender, dob, email, maiden_name, occupation, password, usertype, status, kycstatus, confirmPassword } = data;
        if (password !== confirmPassword)
            throw new Error("Password not match");
        const userExist = yield account_1.default.findOne({
            $or: [{ phone, email }]
        });
        if (userExist)
            throw new Error("User already exist");
        // @ts-ignore
        const passwordHash = yield (0, encryptions_1.passHash)(password);
        const account = new account_1.default({
            phone,
            name,
            gender,
            dob,
            email,
            maiden_name,
            occupation,
            password: passwordHash,
            usertype,
        });
        const registerAccount = yield account.save();
        const token = yield (0, encryptions_1.tokenizeUser)({
            id: registerAccount.id,
            usertype: registerAccount.usertype,
            name: registerAccount.name
        });
        return {
            msg: "Account created successfully",
            token
        };
    }
    catch (error) {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.signUpAccount = signUpAccount;
const loginAccount = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, password } = data;
        const userExist = yield account_1.default.findOne({ phone }).select("password usertype lastLogin name").lean();
        if (!userExist)
            throw new Error("Account not existing");
        const passwordMatch = yield (0, encryptions_1.passCompare)(password, userExist.password);
        if (!passwordMatch)
            throw new Error("Invalid credentials");
        yield account_1.default.updateOne({ phone }, { lastLogin: new Date() });
        const token = yield (0, encryptions_1.tokenizeUser)({
            id: userExist._id,
            usertype: userExist.usertype,
            name: userExist.name,
            lastlogin: userExist.lastLogin,
        });
        return { token };
    }
    catch (error) {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.loginAccount = loginAccount;
const updateProfile = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAccount = yield account_1.default.findByIdAndUpdate(userId, data, { new: true });
        if (!updatedAccount)
            throw new Error("User not found");
        return {
            msg: "Profile updated successfully",
            account: updatedAccount
        };
    }
    catch (error) {
        throw new Error((error === null || error === void 0 ? void 0 : error.message) || "An error occurred while updating the profile");
    }
});
exports.updateProfile = updateProfile;
const updatePassword = (userId, oldPassword, newPassword, confirmNewPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (newPassword !== confirmNewPassword)
            throw new Error("New password and confirm password do not match");
        const userExist = yield account_1.default.findById(userId);
        if (!userExist)
            throw new Error("User not found");
        const isPasswordMatch = yield (0, encryptions_1.passCompare)(oldPassword, userExist.password);
        if (!isPasswordMatch)
            throw new Error("Old password is incorrect");
        userExist.password = yield (0, encryptions_1.passHash)(newPassword);
        const updatedAccount = yield userExist.save();
        return {
            msg: "Password updated successfully",
            account: updatedAccount
        };
    }
    catch (error) {
        throw new Error((error === null || error === void 0 ? void 0 : error.message) || "An error occurred while updating the password");
    }
});
exports.updatePassword = updatePassword;
const userInfo = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, encryptions_1.detokenizeUser)(token);
        return response;
    }
    catch (error) {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.userInfo = userInfo;
