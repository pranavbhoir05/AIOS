import dotenv from "dotenv";
import connectDB from "./database/index.js";
import app from "./app.js";

dotenv.config();

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(
                `Server running at http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((error) => {
        console.error("Failed to start server:", error);
    });