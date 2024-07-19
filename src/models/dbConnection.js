"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = require("mongoose");
const madeURI = () => {
    if (process.env.NODE_ENV === "development") {
        const flint = `${process.env.MONGO_URI}/test`;
        return flint;
    }
    const flint = `${process.env.MONGO_URI}/production`;
    return flint;
};
exports.dbConnect = (0, mongoose_1.createConnection)(
// madeURI() as string,
process.env.MONGO_URI);
exports.dbConnect.on("error", (error) => {
    console.error("Error establishing Account Connectiong: ", error);
    process.exit(1);
});
exports.dbConnect.once("open", () => {
    console.log("DB connection established successfully: ");
});
