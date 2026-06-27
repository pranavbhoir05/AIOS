import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config/jwt.config.js";
import {
    AUTH,
    COOKIE_OPTIONS,
    HTTP_STATUS,
    MESSAGES,
} from "../constants/index.js";
import {
    generateAccessAndRefreshTokens,
    findUserByEmailOrUsername,
} from "../services/auth.service.js";

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, username, email, password } = req.body;

    // Check if user already exists
    const existedUser = await User.findOne({
        $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    });

    if (existedUser) {
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            existedUser.email === email.toLowerCase() 
                ? "Email already registered" 
                : "Username already taken"
        );
    }

    // Create user
    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse(
            HTTP_STATUS.CREATED, 
            createdUser, 
            MESSAGES.USER_REGISTERED
        )
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    // Validate login credentials
    if (!email && !username) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Email or username is required"
        );
    }

    if (!password) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Password is required"
        );
    }

    // Find user
    // Find user
const user = await findUserByEmailOrUsername(
    email?.toLowerCase(),
    username?.toLowerCase()
);

if (!user) {
    throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        MESSAGES.USER_NOT_FOUND
    );
}
    
    // Verify password
    const isPasswordValid = await user.isPasswordCorrect(password);
    
    if (!isPasswordValid) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.INVALID_CREDENTIALS);
    }

    // Generate tokens
    const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

    // Get user without sensitive data
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
        .status(HTTP_STATUS.OK)
        .cookie(AUTH.ACCESS_TOKEN_COOKIE, accessToken, COOKIE_OPTIONS)
        .cookie(AUTH.REFRESH_TOKEN_COOKIE, refreshToken, COOKIE_OPTIONS)
        .json(
            new ApiResponse(
                HTTP_STATUS.OK,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                MESSAGES.LOGIN_SUCCESS
            )
        );
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            req.user,
            "Current user fetched successfully"
        )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
    // Remove refresh token from database
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    return res
        .status(HTTP_STATUS.OK)
        .clearCookie(AUTH.ACCESS_TOKEN_COOKIE, COOKIE_OPTIONS)
        .clearCookie(AUTH.REFRESH_TOKEN_COOKIE, COOKIE_OPTIONS)
        .json(
            new ApiResponse(
                HTTP_STATUS.OK,
                {},
                MESSAGES.LOGOUT_SUCCESS
            )
        );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Refresh token required");
    }

    try {
        // Verify refresh token
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            JWT_CONFIG.refreshTokenSecret
        );

        // Find user
        const user = await User.findById(decodedToken._id);

        if (!user) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid refresh token");
        }

        // Check if refresh token matches database
        if (!user.refreshToken || incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Refresh token expired or invalid");
        }

        // Generate new tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        return res
            .status(HTTP_STATUS.OK)
            .cookie(AUTH.ACCESS_TOKEN_COOKIE, accessToken, COOKIE_OPTIONS)
            .cookie(AUTH.REFRESH_TOKEN_COOKIE, refreshToken, COOKIE_OPTIONS)
            .json(
                new ApiResponse(
                    HTTP_STATUS.OK,
                    {
                        accessToken,
                        refreshToken,
                    },
                    "Access token refreshed successfully"
                )
            );
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid refresh token");
        }
        throw error;
    }
});

export { 
    registerUser, 
    loginUser, 
    getCurrentUser, 
    logoutUser, 
    refreshAccessToken 
};