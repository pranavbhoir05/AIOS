import mongoose from "mongoose";

const memorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            enum: [
                "personal",
                "preference",
                "project",
                "skill",
                "goal",
                "other",
            ],
            default: "other",
        },

        importance: {
            type: Number,
            default: 5,
            min: 1,
            max: 10,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Memory", memorySchema);