import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "New Chat",
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Conversation = mongoose.model(
    "Conversation",
    conversationSchema
);

export default Conversation;