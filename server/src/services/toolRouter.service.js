import { executeTool } from "./toolExecutor.service.js";
import { validateTasks } from "./toolValidator.service.js";
import { withTimeout } from "./toolTimeout.service.js";

export const executePlan = async (planTasks = []) => {
    const tasks = validateTasks(planTasks);

    const results = [];
    const context = {};

    for (const task of tasks) {
        try {
            const result = await withTimeout(
                executeTool(
                    task.tool,
                    task.input,
                    context
                ),
                10000
            );

            if (result.success) {
                context[task.tool] = result.data;
            }

            results.push({
                tool: task.tool,
                output: result,
            });

        } catch (error) {
            results.push({
                tool: task.tool,
                output: {
                    success: false,
                    data: error.message,
                },
            });
        }
    }

    return results;
};