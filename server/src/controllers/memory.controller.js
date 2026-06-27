import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

import {
    createMemory,
    getUserMemories,
    getMemoryById,
    updateMemory,
    deleteMemory,
} from "../services/memory.service.js";

export const createMemoryController = asyncHandler(async (req, res) => {
    const memory = await createMemory({
        userId: req.user._id,
        content: req.body.content,
        category: req.body.category,
        importance: req.body.importance,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, memory, "Memory created successfully"));
});

export const getMemoriesController = asyncHandler(async (req, res) => {
    const memories = await getUserMemories(req.user._id);

    return res
        .status(200)
        .json(new ApiResponse(200, memories, "Memories fetched successfully"));
});

export const getMemoryController = asyncHandler(async (req, res) => {
    const memory = await getMemoryById(
        req.params.id,
        req.user._id
    );

    if (!memory) {
        throw new ApiError(404, "Memory not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, memory));
});

export const updateMemoryController = asyncHandler(async (req, res) => {
    const memory = await updateMemory(
        req.params.id,
        req.user._id,
        req.body
    );

    if (!memory) {
        throw new ApiError(404, "Memory not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, memory, "Memory updated successfully"));
});

export const deleteMemoryController = asyncHandler(async (req, res) => {
    const memory = await deleteMemory(
        req.params.id,
        req.user._id
    );

    if (!memory) {
        throw new ApiError(404, "Memory not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Memory deleted successfully"));
});