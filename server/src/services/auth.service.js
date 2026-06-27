import User from "../models/user.model.js";

export const generateAccessAndRefreshTokens = async (userId) => {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({
        validateBeforeSave: false,
    });

    return {
        accessToken,
        refreshToken,
    };
};

export const findUserByEmailOrUsername = async (email, username) => {
    return await User.findOne({
        $or: [{ email }, { username }],
    });
};