"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.generateOTP = exports.generateRandomNumber = void 0;
// Generate Token
const generateRandomNumber = (length) => {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
};
exports.generateRandomNumber = generateRandomNumber;
// Genrate OTP
const generateOTP = (length) => {
    const token = (0, exports.generateRandomNumber)(length);
    return `${token}.${Date.now()}`;
};
exports.generateOTP = generateOTP;
// Verify OTP
const verifyOTP = (otp) => {
    const [token, time] = otp.split('.');
    const totalDiff = Date.now() / 1000 - Number(time);
    if (totalDiff > 1800) {
        throw new Error("OTP Expired");
    }
    return token;
};
exports.verifyOTP = verifyOTP;
