import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import errorHandler from "./middlewares/error.middleware.js";
import healthRouter from "./routes/health.routes.js";
import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";
import memoryRouter from "./routes/memory.routes.js";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        credentials: true,
    })
);

app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(
    express.json({
        limit: "16kb",
    })
);
app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    })
);
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/memory", memoryRouter);

// app.use((err, req, res, next) => {
//     console.log("TEST ERROR:", err);
//     res.status(500).json({ error: err.message });


// });

 app.use(errorHandler);

export default app;