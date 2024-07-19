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
exports.taskRunner = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const telcoproviders_1 = __importDefault(require("../models/telcoproviders"));
const ftpConnect_1 = require("./ftpConnect");
// export const taskRunner = async () => {
//     try {
//         const telcoProviders = await TelcoProviderModel.find().populate('schedule').exec();
//         telcoProviders.forEach(provider => {
//             const { name, ftpUrl, localPath, schedule } = provider;
//             // @ts-ignore
//             const interval = Math.ceil(Number(schedule.timeString) / 1000); 
//             const task = async () => {
//                 console.log(`Running scheduled upload for telco provider: ${provider.name}`);
//                 await ftpHandleUpload(ftpUrl, name);
//             };
//             if (interval < 60) {
//                 cron.schedule(`*/${interval} * * * * *`, task);
//             } else if (interval < 3600) {
//                 const minutes = Math.floor(interval / 60);
//                 const seconds = interval % 60;
//                 cron.schedule(`${seconds} */${minutes} * * * *`, task);
//             } else {
//                 const hours = Math.floor(interval / 3600);
//                 const minutes = Math.floor((interval % 3600) / 60);
//                 const seconds = interval % 60;
//                 cron.schedule(`${seconds} ${minutes} */${hours} * * *`, task);
//             }
//         });
//     } catch (error) {
//         console.error('Error running taskRunner:', error);
//     }
// };
const creatTask = (provider) => {
    const { name, ftpUrl, localPath, schedule } = provider;
    // @ts-ignore
    const interval = Math.ceil(Number(schedule.timeString) / 1000);
    const task = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Running scheduled upload for telco provider: ${name}`);
        // @ts-ignore
        const updaterProviders = yield telcoproviders_1.default.findById(provider._id).populate('schedule').exec();
        if (updaterProviders) {
            const { ftpUrl } = updaterProviders;
            yield (0, ftpConnect_1.ftpHandleUpload)(ftpUrl, name);
        }
        else {
            // @ts-ignore
            console.error(`Unable to find updated provider data for ${provider._id}`);
        }
    });
    if (interval < 60) {
        node_cron_1.default.schedule(`*/${interval} * * * * *`, task);
    }
    else if (interval < 3600) {
        const minutes = Math.floor(interval / 60);
        const seconds = interval % 60;
        node_cron_1.default.schedule(`${seconds} */${minutes} * * * *`, task);
    }
    else {
        const hours = Math.floor(interval / 3600);
        const minutes = Math.floor((interval % 3600) / 60);
        const seconds = interval % 60;
        node_cron_1.default.schedule(`${seconds} ${minutes} */${hours} * * *`, task);
    }
};
const taskRunner = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const telcoProviders = yield telcoproviders_1.default.find().populate('schedule').exec();
        telcoProviders.forEach(provider => {
            creatTask(provider);
        });
    }
    catch (error) {
        console.error('Error running taskRunner:', error);
    }
});
exports.taskRunner = taskRunner;
