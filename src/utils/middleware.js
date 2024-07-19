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
exports.getAuth = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const encryptions_1 = require("./encryptions");
dotenv_1.default.config();
const getAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // Check for predefined token (AUTH_TKN environment variable)
    if (process.env.AUTH_TKN && token === process.env.AUTH_TKN) {
        //   @ts-ignore
        req.user = {
            name: "Weverefy",
            artist: "Gunna 😊😉"
        };
        next();
    }
    else {
        if (!token)
            return res.sendStatus(401); // Unauthorized
        try {
            const user = yield (0, encryptions_1.detokenizeUser)(token);
            if (!user)
                return res.sendStatus(403); // Forbidden
            // @ts-ignore 
            req.user = user;
            next();
        }
        catch (error) {
            console.error('Error verifying JWT token:', error);
            return res.sendStatus(401);
        }
    }
});
exports.getAuth = getAuth;
