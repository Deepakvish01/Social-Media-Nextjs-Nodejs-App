import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        if (connect) {
            console.log(`MongoDB Connected:- ${connect.connection.host}`.yellow.bold);
        }
    } catch (error) {
        console.log()
        process.exit(1)
    }
}
