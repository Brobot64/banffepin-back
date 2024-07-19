"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AGender = exports.KYCStatus = exports.AccountStatus = exports.AccountType = void 0;
const mongoose_1 = require("mongoose");
const dbConnection_1 = require("./dbConnection");
/**
 * phone, name, gender, dob, email, maidenname, occupation, password, usertype, status, Kycstatus
 */
var AccountType;
(function (AccountType) {
    AccountType["Admin"] = "admin";
    AccountType["Personal"] = "personal";
    AccountType["Agent"] = "agent";
    AccountType["Viewer"] = "viewer";
})(AccountType || (exports.AccountType = AccountType = {}));
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["Suspend"] = "suspend";
    AccountStatus["Active"] = "active";
    AccountStatus["Banned"] = "banned";
    AccountStatus["Inactive"] = "inactive";
})(AccountStatus || (exports.AccountStatus = AccountStatus = {}));
var KYCStatus;
(function (KYCStatus) {
    KYCStatus["Verified"] = "verified";
    KYCStatus["Unverified"] = "unverified";
    KYCStatus["Tier1"] = "tier1";
})(KYCStatus || (exports.KYCStatus = KYCStatus = {}));
var AGender;
(function (AGender) {
    AGender["Male"] = "male";
    AGender["Female"] = "female";
    AGender["Nonbinary"] = "not_applicable";
})(AGender || (exports.AGender = AGender = {}));
const accountSchemaFields = {
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
    kycstatus: { type: String, enum: KYCStatus, default: KYCStatus.Verified },
    lastLogin: { type: Date, default: Date.now() },
    metadata: { type: Object, default: {} }
};
const accountSchema = new mongoose_1.Schema(accountSchemaFields, {
    timestamps: true,
});
const accountModel = dbConnection_1.dbConnect.model("account", accountSchema);
exports.default = accountModel;
