import { createConnection, Connection } from "mongoose";

const madeURI = () => {
    if (process.env.NODE_ENV === "development") {
        const flint = `${process.env.MONGO_URI}/test`
        return flint
    }
    const flint = `${process.env.MONGO_URI}/production`
    return flint;
}

export const dbConnect: Connection = createConnection(
    // madeURI() as string,
    process.env.MONGO_URI as string,
);

dbConnect.on("error", (error) => {
    console.error("Error establishing Account Connectiong: ", error);
    process.exit(1);
});

dbConnect.once("open", () => {
    console.log("DB connection established successfully: ")
});