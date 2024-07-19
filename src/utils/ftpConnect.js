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
exports.ftpHandleUpload = void 0;
const basic_ftp_1 = require("basic-ftp");
const dotenv_1 = __importDefault(require("dotenv"));
const efiles_1 = require("../services/efiles");
dotenv_1.default.config();
const basePath = process.env.BASE_LOCAL_PATH || "";
const ftpHandleUpload = (ftpUrl, telco) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new basic_ftp_1.Client(); // Create a new client instance for each call
    try {
        const localPath = `${basePath}${telco}.txt`;
        yield client.access({
            host: "eu-central-1.sftpcloud.io",
            port: 21,
            user: "bf3c4d8e629d486887bbf57864197c5d",
            password: "7CY1rDUU0CPqIxMMdA1jrOyKiZv57RPA",
        });
        yield client.downloadTo(localPath, ftpUrl);
        const answer = yield (0, efiles_1.uploadEPinFiles)(localPath, telco, "NG");
    }
    catch (error) {
        console.log(`${telco} => Error ${error === null || error === void 0 ? void 0 : error.message}`);
    }
    finally {
        client.close();
    }
});
exports.ftpHandleUpload = ftpHandleUpload;
