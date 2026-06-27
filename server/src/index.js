
import connectDB from "./database/index.js";
import app from "./app.js";
import { APP_CONFIG } from "./config/app.config.js";
import "./config/env.js";



const PORT = APP_CONFIG.port || 8000;

connectDB()
    .then(() => {
        app.listen(APP_CONFIG.port, () => {
    console.log(`Server running on ${APP_CONFIG.port}`);
});
    })
    .catch((error) => {
        console.error("Failed to start server:", error);
    });