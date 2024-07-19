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
const twilio_1 = require("twilio");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accountSID = process.env.TWL_SID || "ACa79e6cff95ac6";
const accountAuthTkn = process.env.TWL_TKN || "3b78e029c2088";
const adminNumber = process.env.TWL_NUM || '+14758469460';
const client = new twilio_1.Twilio(accountSID, accountAuthTkn);
const sendVerificationSMS = (phoneNumber, verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield client.messages.create({
            body: `Your verification code for \n Banff-Pay E-Pin is: \n ${verificationToken}`,
            to: phoneNumber,
            from: adminNumber,
        });
        // const whatsapp = await client.messages.create({
        //     body: `WEVEREFY-\nYour verification code is: \n ${verificationToken}`,
        //     from: 'whatsapp:+14155238886',
        //     to: `whatsapp:${phoneNumber}`
        // });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = sendVerificationSMS;
