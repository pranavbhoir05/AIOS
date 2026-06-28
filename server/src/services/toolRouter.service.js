import { executeTool } from "./toolExecutor.service.js";
import { validateTasks } from "./toolValidator.service.js";
import { withTimeout } from "./toolTimeout.service.js";

export const executePlan = async (plan) => {
    tasks = validateTasks(tasks);
   const results = await Promise.all(
    tasks.map(async (task) => {
        const tool = TOOLS.find(
            (t) => t.name === task.tool
        );

        if (!tool) {
            return {
                tool: task.tool,
                success: false,
                data: "Tool not found",
            };
        }

        try {
            const result = await withTimeout(
                tool.execute(task.input),
                10000
            );

            return {
                tool: task.tool,
                ...result,
            };
        } catch (error) {
            return {
                tool: task.tool,
                success: false,
                data: error.message,
            };
        }
    })
);

return results;