import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {

    mongoose.set("strictQuery", true)

    if (isConnected) {
        console.log("Connected to database")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "prompt_finder",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (error) {

    }

}