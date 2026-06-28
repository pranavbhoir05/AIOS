export const validatePlan = (plan, originalMessage) => {
    if (!plan || typeof plan !== "object") {
        return {
            tasks: [],
            llmQuery: originalMessage,
        };
    }

    if (!Array.isArray(plan.tasks)) {
        plan.tasks = [];
    }

    plan.tasks = plan.tasks
        .filter((task) => task && typeof task === "object")
        .map((task) => ({
            tool: task.tool,
            input: task.input || originalMessage,
        }))
        .filter((task) => task.tool);

    if (
        typeof plan.llmQuery !== "string" ||
        !plan.llmQuery.trim()
    ) {
        plan.llmQuery = originalMessage;
    }

    return plan;
};