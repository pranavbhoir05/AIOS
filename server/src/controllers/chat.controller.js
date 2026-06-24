import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import askAI from "../services/ai.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import generateTitle from "../services/title.service.js";

const sendMessage = asyncHandler(async (req, res) => {
    const { conversationId, message } = req.body;

    if (!message?.trim()) {
        throw new ApiError(400, "Message is required");
    }

    let conversation;

    if (conversationId) {
        conversation = await Conversation.findOne({
            _id: conversationId,
            owner: req.user._id,
        });

        if (!conversation) {
            throw new ApiError(404, "Conversation not found");
        }
   } else {
    const title = await generateTitle(message);

    conversation = await Conversation.create({
        owner: req.user._id,
        title,
    });
}

    await Message.create({
        conversation: conversation._id,
        role: "user",
        content: message,
    });

    const messages = await Message.find({
        conversation: conversation._id,
    }).sort({ createdAt: 1 });

    const formattedMessages = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
    }));

    const aiReply = await askAI(formattedMessages);

    await Message.create({
        conversation: conversation._id,
        role: "assistant",
        content: aiReply,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                conversationId: conversation._id,
                reply: aiReply,
            },
            "Message processed successfully"
        )
    );
});

const getUserConversations = asyncHandler(async (req, res) => {
    const conversations = await Conversation.find({
        owner: req.user._id,
    })
        .sort({ updatedAt: -1 })
        .select("title createdAt updatedAt");

    return res.status(200).json(
        new ApiResponse(
            200,
            conversations,
            "Conversations fetched successfully"
        )
    );
});

const getConversationMessages = asyncHandler(async (req, res) => {
    const { conversationId } = req.params;

    const conversation = await Conversation.findOne({
        _id: conversationId,
        owner: req.user._id,
    });

    if (!conversation) {
        throw new ApiError(404, "Conversation not found");
    }

    const messages = await Message.find({
        conversation: conversationId,
    }).sort({ createdAt: 1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            messages,
            "Messages fetched successfully"
        )
    );
});

const renameConversation = asyncHandler(async (req, res) => {
    const { conversationId } = req.params;
    const { title } = req.body;

    if (!title?.trim()) {
        throw new ApiError(400, "Title is required");
    }

    const conversation = await Conversation.findOneAndUpdate(
        {
            _id: conversationId,
            owner: req.user._id,
        },
        {
            title,
        },
        {
            new: true,
        }
    );

    if (!conversation) {
        throw new ApiError(404, "Conversation not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            conversation,
            "Conversation renamed successfully"
        )
    );
});

const deleteConversation = asyncHandler(async (req, res) => {
    const { conversationId } = req.params;

    const conversation = await Conversation.findOne({
        _id: conversationId,
        owner: req.user._id,
    });

    if (!conversation) {
        throw new ApiError(404, "Conversation not found");
    }

    await Message.deleteMany({
        conversation: conversationId,
    });

    await Conversation.findByIdAndDelete(conversationId);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Conversation deleted successfully"
        )
    );
});

export { sendMessage, getUserConversations, getConversationMessages, renameConversation, deleteConversation };