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
            user: "89f932b2161045f5b18e14b81f9eda1d",
            password: "vwqeXjWKcLYk1SoO2Bo0reK9Kr9W904r",
        });
        await client.downloadTo(localPath, ftpUrl);
        const answer = await uploadEPinFiles(localPath, telco, "NG");
    } catch (error: any) {
        console.log(`${telco} => Error ${error?.message}`);
    } finally {
        client.close();
    }
};
