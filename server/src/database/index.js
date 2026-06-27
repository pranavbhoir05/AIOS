import mongoose from "mongoose";
import { DATABASE_CONFIG } from "../config/database.config.js";

const connectDB = async () => {
    try {
        if (!DATABASE_CONFIG.uri) {
            throw new Error("MongoDB URI missing in config");
        }

        const connectionInstance = await mongoose.connect(DATABASE_CONFIG.uri);

        console.log(`✅ MongoDB Connected: ${connectionInstance.connection.host}`);
        console.log(`📦 Database: ${connectionInstance.connection.name}`);

        return connectionInstance;
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;