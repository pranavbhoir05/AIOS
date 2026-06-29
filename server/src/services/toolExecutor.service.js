import { TOOLS } from "./toolRegistry.service.js";

export const executeTool = async (
    toolName,
    input,
    context = {}
) => {
    const tool = TOOLS.find(
        (t) => t.name === toolName
    );

    if (!tool) {
        throw new Error(`Tool not found: ${toolName}`);
    }

    return await tool.execute(input, context);
};