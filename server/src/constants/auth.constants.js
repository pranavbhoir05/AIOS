export const AUTH = {
    ACCESS_TOKEN_COOKIE: "accessToken",
    REFRESH_TOKEN_COOKIE: "refreshToken",

    ACCESS_TOKEN_EXPIRY: "1d",
    REFRESH_TOKEN_EXPIRY: "7d",
};

export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
};