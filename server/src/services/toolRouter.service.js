import { TOOLS } from "./toolRegistry.service.js";

export const executeTool = async (message) => {
    const input = message.toLowerCase();

    for (const tool of TOOLS) {
        const matched = tool.keywords.some((keyword) =>
            input.includes(keyword)
        );

        if (matched) {
            console.log(`Executing ${tool.name} Tool`);
            return await tool.execute();
        }
    }

    return null;
};