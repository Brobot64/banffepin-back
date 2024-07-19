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
const account_1 = __importDefault(require("../models/account"));
const smsMessaging_1 = __importDefault(require("../utils/smsMessaging"));
const token_1 = require("../utils/token");
const tokenHandler_1 = require("./tokenHandler");
const TokenService = {
    createToken: (phone_number) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tokenExist = yield account_1.default.findOne({ phone: phone_number }).lean();
            if (tokenExist) {
                throw new Error("Phone No already in Use!");
            }
            const token = (0, token_1.generateOTP)(4);
            const [tkn, expt] = token.split('.');
            yield tokenHandler_1.tempTokenStore.saveToken("email.user@domain.com", phone_number, tkn);
            yield (0, smsMessaging_1.default)(phone_number, tkn);
            return {
                msg: "Verification Code Sent"
            };
        }
        catch (error) {
            throw new Error(error === null || error === void 0 ? void 0 : error.message);
        }
    }),
    verifyToken: (phone_number, token) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const isValidCode = yield tokenHandler_1.tempTokenStore.verifyToken(phone_number, token);
            if (!isValidCode)
                throw new Error("Invalid Verification Code");
            yield tokenHandler_1.tempTokenStore.deleteToken(phone_number);
            return {
                msg: "Phone No Verified"
            };
        }
        catch (error) {
            throw new Error(error === null || error === void 0 ? void 0 : error.message);
        }
    }),
    resendToken: (phone_number) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const action = yield tokenHandler_1.tempTokenStore.resendOTP(phone_number);
            if (action) {
                yield (0, smsMessaging_1.default)(phone_number, action);
                return {
                    msg: "Verification Sent"
                };
            }
            return "Error sending Verification";
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
exports.default = TokenService;
