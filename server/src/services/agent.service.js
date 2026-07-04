import { createPlan } from "./planner.service.js";
import { executePlan } from "./toolRouter.service.js";
import askAI from "./ai.service.js";
import { analyzeProject } from "./projectAnalyzer.service.js";
import { exploreProject } from "./projectExplorer.service.js";
import { runLoop } from "./loopAgent.service.js";
import { fixBackend } from "./fixAgent.service.js";

export const runAgent = async (message, memories = "") => {
if (message.toLowerCase() === "fix my backend") {
    const result = await fixBackend(message);

    const messages = [
        {
            role: "system",
            content: `
You are AIOS.

You attempted to diagnose a backend project.

${JSON.stringify(result, null, 2)}

Provide:

1. Root cause
2. Files to inspect next
3. Files to modify
4. Exact fix
5. Why the fix works.
`,
        },
    ];

    return await askAI(messages, memories);
}
    if (message.toLowerCase().includes("fix my backend")) {
    const history = await runLoop(message);

    console.log(
        "LOOP HISTORY:",
        JSON.stringify(history, null, 2)
    );

    return "Loop executed. Check server logs.";
}
    
    const plan = await createPlan(message);

    if (
    message.toLowerCase().includes("analyze my project") ||
    message.toLowerCase().includes("analyse my project")
) {
    const projectResults = await analyzeProject();

    plan.tasks = [
        ...projectResults
            .filter(
                (r) =>
                    r.tool === "search_files" &&
                    r.output?.success
            )
            .flatMap((r) =>
                (r.output.data || []).map((file) => ({
                    tool: "read_file",
                    input: file,
                }))
            ),
    ];
}

    const lowerMessage = message.toLowerCase();

if (
    message.toLowerCase().includes("analyze my project") ||
    message.toLowerCase().includes("analyse my project")
) {
    const project = await exploreProject();

    toolResults.push(...project.fileContents);
}

    console.log("Plan:", JSON.stringify(plan, null, 2));

    const toolResults = await executePlan(plan.tasks);
console.log(
    "TOOL RESULTS:",
    JSON.stringify(toolResults, null, 2)
);
   
for (const result of toolResults) {
    if (
        result.tool !== "search_files" ||
        !result.output?.success
    ) {
        continue;
    }

    const files = result.output.data || [];

    for (const file of files) {
        console.log("Auto-reading:", file);

        const readResults = await executePlan([
            {
                tool: "read_file",
                input: file,
            },
        ]);

        toolResults.push(...readResults);
    }
}

    let systemPrompt = "";

    if (toolResults.length > 0) {
       const toolSummary = toolResults
    .map((r) => {
        const value =
            typeof r.output?.data === "object"
                ? JSON.stringify(r.output.data, null, 2)
                : r.output?.data;

        return `${r.tool}: ${value}`;
    })
    .join("\n\n");

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

   messages.push({
    role: "user",
    content: plan.llmQuery || message,
});

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