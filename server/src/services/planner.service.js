import axios from "axios";
import { validatePlan } from "./plannerValidator.service.js";
import { buildToolPrompt } from "./toolPrompt.service.js";

export const createPlan = async (message) => {
 const prompt = `
${PLANNER_PROMPT}

You are AIOS Planner.

Available tools are listed below.

Choose the best tool based on:
- description
- category
- required input
- expected output

Do not invent tools.

Only use tools listed in AVAILABLE TOOLS.

Return ONLY valid JSON.

${buildToolPrompt()}
`;

    const response = await axios.post(
        `${process.env.OLLAMA_BASE_URL}/api/generate`,
        {
            model: "gemma3:latest",
            prompt: `${prompt}\n\nUser: ${message}`,
            stream: false,
        }
    );

  let text = response.data.response.trim();

text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

console.log("Planner Raw:");
console.log(text);

try {
    const plan = JSON.parse(text);

    plan.tasks = (plan.tasks || []).map((task) => {
        if (typeof task === "string") {
            return {
                tool: task,
                input: message,
            };
        }

        return {
            tool: task.tool,
            input: task.input || message,
        };
    });

  return validatePlan(plan, message);;
} catch (err) {
    console.error("Planner JSON Error");
    console.error(text);

    return {
        tasks: [],
        llmQuery: message,
    };
}
};