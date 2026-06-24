import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        // Use MONGODB_URI that already includes the database name
        const mongoURI = process.env.MONGODB_URI;
        
        if (!mongoURI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        console.log("Connecting to MongoDB...");
        const connectionInstance = await mongoose.connect(mongoURI);

        console.log(`✅ MongoDB Connected: ${connectionInstance.connection.host}`);
        console.log(`📁 Database: ${connectionInstance.connection.name}`);
        console.log(`🔗 URI: ${mongoURI}`);
        
        return connectionInstance;
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

export default connectDB;