import cron from 'node-cron';
import TelcoProviderModel, { ITelcoProvider } from '../models/telcoproviders';
import { ftpHandleUpload } from './ftpConnect';

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

const creatTask = (provider: ITelcoProvider) => {
    const { name, ftpUrl, localPath, schedule } = provider;
     // @ts-ignore
     const interval = Math.ceil(Number(schedule.timeString) / 1000); 

     const task = async () => {
        console.log(`Running scheduled upload for telco provider: ${name}`);
        // @ts-ignore
        const updaterProviders = await TelcoProviderModel.findById(provider._id).populate('schedule').exec();
        if (updaterProviders) {
            const { ftpUrl } = updaterProviders;
            await ftpHandleUpload(ftpUrl, name);
        } else {
            // @ts-ignore
            console.error(`Unable to find updated provider data for ${provider._id}`);
        }
    };

    if (interval < 60) {
        cron.schedule(`*/${interval} * * * * *`, task);
    } else if (interval < 3600) {
        const minutes = Math.floor(interval / 60);
        const seconds = interval % 60;
        cron.schedule(`${seconds} */${minutes} * * * *`, task);
    } else {
        const hours = Math.floor(interval / 3600);
        const minutes = Math.floor((interval % 3600) / 60);
        const seconds = interval % 60;
        cron.schedule(`${seconds} ${minutes} */${hours} * * *`, task);
    }
}

export const taskRunner = async () => {
    try {
        const telcoProviders = await TelcoProviderModel.find().populate('schedule').exec();

        telcoProviders.forEach(provider => {
            creatTask(provider);
        });

    } catch (error: any) {
        console.error('Error running taskRunner:', error);        
    }
}