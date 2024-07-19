import accountModel from "../models/account";
import sendVerificationSMS from "../utils/smsMessaging";
import { generateOTP } from "../utils/token";
import { tempTokenStore } from "./tokenHandler";



const TokenService = {
    createToken: async (phone_number: string) => {
        try {
            const tokenExist = await accountModel.findOne({ phone: phone_number }).lean();

            if (tokenExist) {
                throw new Error("Phone No already in Use!");
            }

            const token = generateOTP(4);
            const [tkn, expt] = token.split('.');
            await tempTokenStore.saveToken("email.user@domain.com", phone_number, tkn);

            await sendVerificationSMS(phone_number, tkn);

            return {
                msg: "Verification Code Sent"
            }
        } catch (error: any) {
            throw new Error(error?.message);
        }
    },

    verifyToken: async (phone_number: string, token: string) => {
        try {
            const isValidCode = await tempTokenStore.verifyToken(phone_number, token);

            if (!isValidCode) throw new Error("Invalid Verification Code");

            await tempTokenStore.deleteToken(phone_number);

            return {
                msg: "Phone No Verified"
            }
        } catch (error: any) {
            throw new Error(error?.message);
        }
    },

    resendToken: async (phone_number: string) => {
        try {
            const action = await tempTokenStore.resendOTP(phone_number);
            if (action) {
                await sendVerificationSMS(
                    phone_number,
                    action
                );
                return {
                    msg: "Verification Sent"
                }
            }

            return "Error sending Verification"
        } catch (error: any) {
            throw new Error(error.message)
        }
    }


}


export default TokenService;