import { Schema } from "mongoose";
import { dbConnect } from "./dbConnection";

/**
 * phone, name, gender, dob, email, maidenname, occupation, password, usertype, status, Kycstatus
 */

export enum AccountType {
    Admin = "admin",
    Personal = "personal",
    Agent = "agent",
    Viewer = 'viewer'
}

export enum AccountStatus {
    Suspend = "suspend",
    Active = "active",
    Banned = "banned",
    Inactive = "inactive"
}

export enum KYCStatus {
    Verified = "verified",
    Unverified = "unverified",
    Tier1 = "tier1"
}

export enum AGender {
    Male = "male",
    Female = "female",
    Nonbinary = "not_applicable"
}

export interface IAccount {
    phone: string;
    name: string;
    gender: AGender;
    dob: string;
    email: string;
    maiden_name: string;
    occupation: string;
    password: string;
    usertype: AccountType;
    status: AccountStatus;
    kycstatus: KYCStatus;
    lastLogin: Date;
    transact_pin: string;
    metadata: {}
}

const accountSchemaFields: Record<keyof IAccount, any> = {
    phone: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    email: { type: String },
    maiden_name: { type: String, required: true },
    occupation: { type: String },
    password: { type: String, required: true },
    usertype: { type: String, required: true, enum: AccountType },
    status: { type: String, required: true, enum: AccountStatus, default: AccountStatus.Active },
    kycstatus: { type: String, enum: KYCStatus, default: KYCStatus.Verified},
    lastLogin: { type: Date, default: Date.now() },
    transact_pin: { type: String },
    metadata: { type: Object, default: {} }
};

const accountSchema: Schema = new Schema (
    accountSchemaFields, {
        timestamps: true,
    }
);

const accountModel = dbConnect.model<IAccount>("account", accountSchema);

export default accountModel;

