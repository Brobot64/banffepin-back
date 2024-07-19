import { Twilio } from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSID = process.env.TWL_SID || "ACa79e6cff95ac6";
const accountAuthTkn = process.env.TWL_TKN || "3b78e029c2088";
const adminNumber = process.env.TWL_NUM || '+14758469460';

const client = new Twilio(accountSID, accountAuthTkn);

const sendVerificationSMS = async (phoneNumber: string, verificationToken: string): Promise<void> => {
    try {

        const message = await client.messages.create({
            body: `Your verification code for \n Banff-Pay E-Pin is: \n ${verificationToken}`,
            to: phoneNumber,
            from: adminNumber,
        });

        // const whatsapp = await client.messages.create({
        //     body: `WEVEREFY-\nYour verification code is: \n ${verificationToken}`,
        //     from: 'whatsapp:+14155238886',
        //     to: `whatsapp:${phoneNumber}`
        // });
        
    } catch (error: any) {
        console.log(error)
    }
}

export default sendVerificationSMS;