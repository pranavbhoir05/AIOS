import { executeTool } from "./toolExecutor.service.js";
import askAI from "./ai.service.js";

export const executePlan = async (plan, memories = "") => {
    const results = [];

    for (const task of plan) {
        if (task.tool === "llm") {
            continue;
        }

        const output = await executeTool(task);

        results.push({
            tool: task.tool,
            input: task.input,
            output,
        });
    }

    const toolContext = results
        .map(
            (r) =>
                `Tool: ${r.tool}
Input: ${r.input}
Output: ${
                    typeof r.output === "object"
                        ? JSON.stringify(r.output)
                        : r.output
                }`
        )
        .join("\n\n");

    const finalPrompt = [
        {
            role: "system",
            content:
                "These are verified tool results. Use them when answering.",
        },
        {
            role: "user",
            content: toolContext,
        },
    ];

    const finalAnswer = await askAI(finalPrompt, memories);

    return finalAnswer;
};