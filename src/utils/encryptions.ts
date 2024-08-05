import { compare, hash } from "bcryptjs"
import mongoose from "mongoose";
import { AccountType } from "../models/account";
import jwt from 'jsonwebtoken';
import crypto from 'crypto'

const secret = process.env.SECRET_MSG;
const jwtSecret = process.env.JWT_SECRET || 'birmingham';
const maxAge = 60 * 30 * 24 * 7;

export const passHash = async (text: string) => {
    const hashedEntry = await hash(`${text}${secret}`, 10);

    return hashedEntry;
}

export const passCompare = async (text: string, dbPassword: string) => {
    const comparePass = await compare(`${text}${secret}`, dbPassword);
    return comparePass;
}

export const tokenizeUser = async(payload: {
    id: mongoose.Types.ObjectId;
    usertype: AccountType;
    name?: string;
    lastlogin?: any;
}) => {
    return jwt.sign({ ...payload }, jwtSecret, {
        encoding: '',
        expiresIn: maxAge,
    })
}

export const detokenizeUser = async (token: string) => {
    try {
        const decoded = jwt.verify(token, jwtSecret);
        return decoded;
    } catch (error: any) {
        throw new Error(error.message);
    }
}


const algorithm = 'aes-256-ctr';
const key = Buffer.from(`${process.env.ENCRYPTION_KEY}`, 'hex');
//  = process.env.SECRET_KEY || 'wassam';

export const encrypt = (text: string) => {
  const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv) 
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decrypt = (hash: string) => {
  const parts = hash.split(':');
//   const iv = Buffer.from(parts.shift(), 'hex')
//   @ts-ignore
  const iv = Buffer.from(parts.shift(), 'hex');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);

  return decrypted.toString();
};

export const createApiKey = () => {
  return crypto.randomBytes(32).toString('hex');
}


