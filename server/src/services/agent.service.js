import { createPlan } from "./planner.service.js";
import { executePlan } from "./toolRouter.service.js";
import askAI from "./ai.service.js";

export const runAgent = async (message, memories = "") => {
    const plan = await createPlan(message);

    console.log("Plan:", JSON.stringify(plan, null, 2));

    const toolResults = await executePlan(plan.tasks);

    let systemPrompt = "";

if (toolResults.length > 0) {
    const toolSummary = toolResults
    .map(
        (r) =>
            `${r.tool}: ${
                typeof r.output === "object"
                    ? r.output.data ?? JSON.stringify(r.output)
                    : r.output
            }`
    )
    .join("\n");

systemPrompt = `
You are AIOS.

The following information has already been computed by trusted tools.

Use it naturally in your answer.

Do NOT repeat the tool names.
Do NOT repeat the raw tool outputs verbatim.
Do NOT mention that tools were used.

Information:

${toolSummary}
`;
}

    const messages = [];

    if (systemPrompt) {
        messages.push({
            role: "system",
            content: systemPrompt,
        });
    }

    if (plan.llmQuery) {
        messages.push({
    role: "user",
    content: `
Original user request:

${message}

Use the verified tool results above wherever applicable.
Answer every part of the original request.
`,
});
    }

    if (messages.length === 0) {
        return toolResults
            .map(
                (r) =>
                    `${r.tool}: ${
                        typeof r.output === "object"
                            ? JSON.stringify(r.output)
                            : r.output
                    }`
            )
            .join("\n");
    }
    console.log("Messages sent to AI:");
console.log(JSON.stringify(messages, null, 2));
    return await askAI(messages, memories);
};