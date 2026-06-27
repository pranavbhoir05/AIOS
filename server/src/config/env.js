import dotenv from "dotenv";

dotenv.config();

console.log("MONGODB_URI =", process.env.MONGODB_URI);
console.log("DB_NAME =", process.env.DB_NAME);

export {};