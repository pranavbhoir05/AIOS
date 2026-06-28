import { TOOLS } from "./toolRegistry.service.js";

export const executeTool = async (task) => {
    task.input ??= "";

    const tool = TOOLS.find((t) => t.name === task.tool);

    if (!tool) {
        throw new Error(`Unknown tool: ${task.tool}`);
    }

    try {
        const result = await tool.execute(task.input);

        return result;
    } catch (error) {
        console.error(`Tool ${task.tool} failed:`, error);

        return {
            error: true,
            message: error.message,
        };
    }
};