import accountModel, { IAccount } from "../models/account";
import { detokenizeUser, passCompare, passHash, tokenizeUser } from "../utils/encryptions";


export const signUpAccount = async (data: Partial<IAccount & {confirmPassword?: string}>) => {
    try {
        const {
                phone,
                name,
                gender,
                dob,
                email,
                maiden_name,
                occupation,
                password,
                usertype,
                status,
                kycstatus,
                confirmPassword
        } = data;

        if (password !== confirmPassword) throw new Error("Password not match");

        const userExist = await accountModel.findOne({
            $or: [{ phone, email }]
        });

        if (userExist) throw new Error("User already exist");

        // @ts-ignore
        const passwordHash = await passHash(password);

        const account = new accountModel({
            phone,
            name,
            gender,
            dob,
            email,
            maiden_name,
            occupation,
            password: passwordHash,
            usertype,
        });

        const registerAccount = await account.save();

        const token = await tokenizeUser({
            id: registerAccount.id,
            usertype: registerAccount.usertype,
            name: registerAccount.name
        });

        return {
            msg: "Account created successfully",
            token
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}


export const loginAccount = async (data: any) => {
    try {
        const { phone, password } = data;
        const userExist = await accountModel.findOne({ phone }).select("password usertype lastLogin name").lean();

        if(!userExist) throw new Error("Account not existing");

        const passwordMatch = await passCompare(password, userExist.password);

        if (!passwordMatch) throw new Error("Invalid credentials");

        await accountModel.updateOne({ phone }, { lastLogin: new Date() });

        const token = await tokenizeUser({
            id: userExist._id,
            usertype: userExist.usertype,
            name: userExist.name,
            lastlogin: userExist.lastLogin,
        });

        return { token }
    } catch (error: any) {
        throw new Error(error?.message);
    }
}

export const updateProfile = async (userId: string, data: Partial<IAccount>) => {
    try {
        const updatedAccount = await accountModel.findByIdAndUpdate(userId, data, { new: true });

        if (!updatedAccount) throw new Error("User not found");

        return {
            msg: "Profile updated successfully",
            account: updatedAccount
        }
    } catch (error: any) {
        throw new Error(error?.message || "An error occurred while updating the profile");
    }
}

export const updatePassword = async (userId: string, oldPassword: string, newPassword: string, confirmNewPassword: string) => {
    try {
        if (newPassword !== confirmNewPassword) throw new Error("New password and confirm password do not match");

        const userExist = await accountModel.findById(userId);

        if (!userExist) throw new Error("User not found");

        const isPasswordMatch = await passCompare(oldPassword, userExist.password);
        if (!isPasswordMatch) throw new Error("Old password is incorrect");

        userExist.password = await passHash(newPassword);
        const updatedAccount = await userExist.save();

        return {
            msg: "Password updated successfully",
            account: updatedAccount
        }
    } catch (error: any) {
        throw new Error(error?.message || "An error occurred while updating the password");
    }
}


export const userInfo = async (token: string) => {
    try {
        const response = await detokenizeUser(token);
        return response;
    } catch (error: any) {
        throw new Error(error?.message);
    }
}

