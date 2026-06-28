import Memory from "../models/memory.model.js";

export const retrieveRelevantMemories = async (
    userId,
    query = ""
) => {
    try {
        const memories = await Memory.find({
            user: userId,
        })
            .sort({ createdAt: -1 })
            .limit(10);

        if (!memories.length) {
            return "";
        }

        return memories
            .map((memory) => `- ${memory.content}`)
            .join("\n");
    } catch (error) {
        console.error("Memory retrieval failed:", error);
        return "";
    }
};