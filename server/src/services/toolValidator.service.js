import { TOOLS } from "./toolRegistry.service.js";

export const validateTasks = (tasks = []) => {
    const availableTools = new Set(
        TOOLS.map((tool) => tool.name)
    );

    return tasks.filter((task) => {
        if (!task.tool) return false;

        return availableTools.has(task.tool);
    });
};