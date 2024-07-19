"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.allWrap = exports.localCreatePgp = exports.generateKeys = exports.deCryptPgp = exports.pullPgp = void 0;
const fs_1 = __importDefault(require("fs"));
const openpgp = __importStar(require("openpgp"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const privatePgpKey = process.env.PGP_PRIVATE_KEY || '';
const publicPgpKey = process.env.PGP_PUBLIC_KEY || '';
const passPgpPhrase = process.env.PGP_PASS_PHRASE || '';
const fetchLue = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    const buffer = yield response.arrayBuffer();
    return Buffer.from(buffer); // Return the buffer directly
});
const pullPgp = (url, path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        const flint = yield fetchLue(url);
        const fileStream = fs_1.default.createWriteStream(path);
        return new Promise((resolve, reject) => {
            fileStream.write(flint, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                fileStream.close((closeErr) => {
                    if (closeErr) {
                        reject(closeErr);
                    }
                    else {
                        console.log("file downloaded!!");
                        resolve();
                    }
                });
            });
        });
        // @ts-ignore
        fs_1.default.writeFileSync(path, buffer);
        console.log(`File saved to ${path}`);
    }
    catch (error) {
        console.error(`Error fetching or saving file: ${error.message}`);
    }
});
exports.pullPgp = pullPgp;
const deCryptPgp = (pgpFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const encryptedData = fs_1.default.readFileSync(pgpFilePath, 'utf8');
    const publicKey = yield openpgp.readKey({ armoredKey: `${publicPgpKey}` });
    const privateKey = yield openpgp.decryptKey({
        privateKey: yield openpgp.readPrivateKey({ armoredKey: `${privatePgpKey}` }),
        passphrase: `${passPgpPhrase}`
    });
    const message = yield openpgp.readMessage({
        armoredMessage: encryptedData // parse armored message
    });
    const { data: decrypted, signatures } = yield openpgp.decrypt({
        message,
        decryptionKeys: privateKey,
        expectSigned: true,
        verificationKeys: publicKey,
    });
    return { decrypted };
});
exports.deCryptPgp = deCryptPgp;
const generateKeys = () => __awaiter(void 0, void 0, void 0, function* () {
    const { privateKey, publicKey } = yield openpgp.generateKey({
        type: 'rsa', // Type of the key, e.g., RSA
        rsaBits: 4096, // Number of bits for RSA keys
        userIDs: [{ name: 'Banffpay', email: 'banffpay@webmail.africa.com' }], // User ID
        passphrase: passPgpPhrase // Passphrase to protect the private key
    });
    // Save the keys to files
    fs_1.default.writeFileSync('publicKey.asc', publicKey, 'utf8');
    fs_1.default.writeFileSync('privateKey.asc', privateKey, 'utf8');
});
exports.generateKeys = generateKeys;
const localCreatePgp = (url, path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = fs_1.default.readFileSync(url, 'utf8');
        const publicKey = yield openpgp.readKey({ armoredKey: publicPgpKey });
        // Read the private key and decrypt it using the passphrase
        const privateKey = yield openpgp.decryptKey({
            privateKey: yield openpgp.readPrivateKey({ armoredKey: privatePgpKey }),
            passphrase: passPgpPhrase
        });
        // Encrypt the message
        const encrypted = yield openpgp.encrypt({
            message: yield openpgp.createMessage({ text }), // input as Message object
            encryptionKeys: publicKey,
            signingKeys: privateKey // optional
        });
        fs_1.default.writeFileSync(path, encrypted, 'utf8');
        return;
    }
    catch (error) {
        console.error(`Error fetching or saving file: ${error.message}`);
    }
});
exports.localCreatePgp = localCreatePgp;
const allWrap = (url, path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pull = yield (0, exports.pullPgp)(url, path);
        const depull = yield (0, exports.deCryptPgp)(path);
        return;
    }
    catch (error) {
    }
});
exports.allWrap = allWrap;
