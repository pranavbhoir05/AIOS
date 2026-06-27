import { z } from "zod";

export const registerSchema = z.object({
    fullName: z.string().trim().min(1, "Full name is required"),

    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters"),

    email: z.email("Invalid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
    email: z.email("Invalid email address"),

    password: z
        .string()
        .min(1, "Password is required"),
});

export const refreshTokenSchema = z.object({
    refreshToken: z
        .string()
        .min(1, "Refresh token is required"),
});