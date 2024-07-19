"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan = require('morgan');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token_1 = __importDefault(require("./src/routes/token"));
const account_1 = __importDefault(require("./src/routes/account"));
const schedule_1 = __importDefault(require("./src/routes/schedule"));
const telcoprovider_1 = __importDefault(require("./src/routes/telcoprovider"));
const epin_1 = __importDefault(require("./src/routes/epin"));
const scheduleRunner_1 = require("./src/utils/scheduleRunner");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3003;
(0, scheduleRunner_1.taskRunner)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true, limit: "20mb" }));
app.use(express_1.default.json({ limit: "20mb" }));
app.use(morgan("tiny"));
app.use('/token', token_1.default);
app.use('/auth', account_1.default);
app.use('/schedule', schedule_1.default);
app.use('/provider', telcoprovider_1.default);
app.use('/pin', epin_1.default);
// pullPgp("https://file.io/37JuDvMXZw3B", '/Users/Brobot/Downloads/eplinflinter/jumper.txt');
// deCryptPgp("/Users/Brobot/Downloads/eplinflinter/jumper.txt")
// deCryptPgp("/Users/Brobot/Downloads/eplinflinter/jumper.txt")
//     .then(({ decrypted }) => {
//         console.log('Decrypted data:', decrypted);
//     })
//     .catch(error => {
//         console.error('Decryption failed:', error);
//     });
// const duwal = encrypt('356890-00-0-677767');
// console.log(duwal, decrypt(duwal));
// generateKeys().catch(console.error);
// pullPgp('C:/Users/Brobot/OneDrive/Documents/N100-N100-PNGN_30062020_2342523406-2019006.txt','encrypt.pgp');
// deCryptPgp('encrypt.pgp');
// uploadEPinFiles('C:/Users/Brobot/OneDrive/Documents/N100-N100-PNGN_30062020_2342523406-2019006.txt')
// ftpHandleUpload("/N100-N100-PNGN_30062020_2342523406-2019006.txt");
app.listen(PORT, () => {
    console.log(`Service Running on PORT: ${PORT}`);
});
