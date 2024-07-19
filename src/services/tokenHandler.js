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
exports.tempTokenStore = void 0;
const tempToken_1 = __importDefault(require("../models/tempToken"));
const token_1 = require("../utils/token");
exports.tempTokenStore = {
    saveToken: (email, phone_number, token) => __awaiter(void 0, void 0, void 0, function* () {
        const tempToken = new tempToken_1.default({ email, phone_number, token });
        yield tempToken.save();
    }),
    verifyToken: (phone_number, token) => __awaiter(void 0, void 0, void 0, function* () {
        const tempToken = yield tempToken_1.default.findOne({ phone_number, token });
        return !!tempToken;
    }),
    deleteToken: (phone_number) => __awaiter(void 0, void 0, void 0, function* () {
        yield tempToken_1.default.deleteOne({ phone_number });
    }),
    resendOTP: (phone_number) => __awaiter(void 0, void 0, void 0, function* () {
        const token = (0, token_1.generateOTP)(4);
        const [tkn, expt] = token.split('.');
        const updatedToken = yield tempToken_1.default.findOneAndUpdate({ phone_number }, { token: tkn, createdAt: Date.now() }, // Reset the createdAt to extend the expiration
        { new: true, upsert: true } // Create a new document if not found
        );
        if (!updatedToken)
            return null;
        return tkn;
    })
};
