import { Client } from "basic-ftp";
import dotenv from 'dotenv';
import { uploadEPinFiles } from "../services/efiles";
dotenv.config();

const basePath = process.env.BASE_LOCAL_PATH || "";

export const ftpHandleUpload = async (ftpUrl: string, telco: string) => {
    const client = new Client(); // Create a new client instance for each call
    try {
        const localPath = `${basePath}${telco}.txt`;
        await client.access({
            host: "eu-central-1.sftpcloud.io",
            port: 21,
            user: "bf3c4d8e629d486887bbf57864197c5d",
            password: "7CY1rDUU0CPqIxMMdA1jrOyKiZv57RPA",
        });
        await client.downloadTo(localPath, ftpUrl);
        const answer = await uploadEPinFiles(localPath, telco, "NG");
    } catch (error: any) {
        console.log(`${telco} => Error ${error?.message}`);
    } finally {
        client.close();
    }
};
