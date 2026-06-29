import axios from "axios";
import { validatePlan } from "./plannerValidator.service.js";
import { buildToolPrompt } from "./toolPrompt.service.js";
import { PLANNER_PROMPT } from "./plannerPrompt.service.js"; // Change path if yours is different

export const createPlan = async (message) => {
    const prompt = `
${PLANNER_PROMPT}

AVAILABLE TOOLS

${buildToolPrompt()}
`;

    try {
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

        plan.llmQuery =
            typeof plan.llmQuery === "string"
                ? plan.llmQuery
                : "";

        const validatedPlan = validatePlan(plan, message);

        console.log("Normalized Plan:");
        console.log(JSON.stringify(validatedPlan, null, 2));

        return validatedPlan;
    } catch (err) {
        console.error("Planner Error:", err.message);

        return validatePlan(
            {
                tasks: [],
                llmQuery: message,
            },
            message
        );
    }
};