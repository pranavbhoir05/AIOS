import Memory from "../models/memory.model.js";

export const createMemory = async ({
    userId,
    content,
    category = "other",
    importance = 5,
}) => {
    return await Memory.create({
        user: userId,
        content,
        category,
        importance,
    });
};

export const getUserMemories = async (userId) => {
    return await Memory.find({ user: userId })
        .sort({ importance: -1, createdAt: -1 })
        .lean();
};

export const getMemoryById = async (id, userId) => {
    return await Memory.findOne({
        _id: id,
        user: userId,
    });
};

export const updateMemory = async (id, userId, updates) => {
    return await Memory.findOneAndUpdate(
        {
            _id: id,
            user: userId,
        },
        updates,
        {
            new: true,
            runValidators: true,
        }
    );
};

export const deleteMemory = async (id, userId) => {
    return await Memory.findOneAndDelete({
        _id: id,
        user: userId,
    });
};