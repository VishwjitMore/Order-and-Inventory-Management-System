import mongoose from "mongoose";

export const connectdb = async () => {
    try {
        const mongouri = process.env.MONGO_URI;
        if (!mongouri) {
            throw new Error("mongodb is not defined");
        }
        await mongoose.connect(mongouri);
        console.log("mongodb connected successfully");
    } catch (err) {
        console.log("MongoDB failed to connect",err);
        process.exit(1);
    }
}