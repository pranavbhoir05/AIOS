import SYSTEM_PROMPT from "../config/systemPrompt.js";

export const buildContext = (memories = "") => {
    const now = new Date();

    return [
        {
            role: "system",
            content: SYSTEM_PROMPT,
        },
        {
            role: "system",
            content: `Current date: ${now.toDateString()}
Current time: ${now.toLocaleTimeString()}
Timezone: UTC`,
        },
        {
            role: "system",
            content: memories
                ? `User memories:

${memories}

Use these only when relevant.`
                : "No stored memories.",
        },
    ];
};