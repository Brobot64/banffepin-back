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
exports.decrypt = exports.encrypt = exports.detokenizeUser = exports.tokenizeUser = exports.passCompare = exports.passHash = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const secret = process.env.SECRET_MSG;
const jwtSecret = process.env.JWT_SECRET || 'birmingham';
const maxAge = 60 * 30 * 24 * 7;
const passHash = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedEntry = yield (0, bcryptjs_1.hash)(`${text}${secret}`, 10);
    return hashedEntry;
});
exports.passHash = passHash;
const passCompare = (text, dbPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const comparePass = yield (0, bcryptjs_1.compare)(`${text}${secret}`, dbPassword);
    return comparePass;
});
exports.passCompare = passCompare;
const tokenizeUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(Object.assign({}, payload), jwtSecret, {
        encoding: '',
        expiresIn: maxAge,
    });
});
exports.tokenizeUser = tokenizeUser;
const detokenizeUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        return decoded;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.detokenizeUser = detokenizeUser;
const algorithm = 'aes-256-ctr';
const key = Buffer.from(`${process.env.ENCRYPTION_KEY}`, 'hex');
//  = process.env.SECRET_KEY || 'wassam';
const encrypt = (text) => {
    const iv = crypto_1.default.randomBytes(16);
    const cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};
exports.encrypt = encrypt;
const decrypt = (hash) => {
    const parts = hash.split(':');
    //   const iv = Buffer.from(parts.shift(), 'hex')
    //   @ts-ignore
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto_1.default.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString();
};
exports.decrypt = decrypt;
