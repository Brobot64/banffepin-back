import TempToken from "../models/tempToken";
import { generateOTP } from "../utils/token";

export const tempTokenStore = {
    saveToken: async (email: string, phone_number: string, token: string) => {
        const tempToken = new TempToken({ email, phone_number, token });
        await tempToken.save();
    },

    verifyToken: async (phone_number: string, token: string): Promise<boolean> => {
        const tempToken = await TempToken.findOne({ phone_number, token });
        return !!tempToken;
    },

    deleteToken: async (phone_number: string) => {
        await TempToken.deleteOne({ phone_number });
    },

    resendOTP: async (phone_number: string) => {
        const token = generateOTP(4);
        const [tkn, expt] = token.split('.');
        const updatedToken = await TempToken.findOneAndUpdate(
            { phone_number },
            { token: tkn, createdAt: Date.now() }, // Reset the createdAt to extend the expiration
            { new: true, upsert: true } // Create a new document if not found
        );

        if (!updatedToken) return null;
        return tkn;
    }
};
