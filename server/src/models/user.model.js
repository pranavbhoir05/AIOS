import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config/jwt.config.js";


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function () {
  // 'this' refers to the user document
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    // In async pre-hooks, throw the error to stop save
    throw new Error(`Password hashing failed: ${error.message}`);
  }
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        JWT_CONFIG.accessTokenSecret,
        {
            expiresIn: JWT_CONFIG.accessTokenExpiry,
        }
    );
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        JWT_CONFIG.refreshTokenSecret,
        {
            expiresIn: JWT_CONFIG.refreshTokenExpiry,
        }
    );
};

const User = mongoose.model("User", userSchema);
export default User;