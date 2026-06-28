import axios from "axios";
import SYSTEM_PROMPT from "../config/systemPrompt.js";
import { buildContext } from "./contextBuilder.service.js";

const askAI = async (messages, memories = "") => {
    try {
        const finalMessages = [];

        finalMessages.push({
            role: "system",
            content: SYSTEM_PROMPT,
        });

        if (memories) {
            finalMessages.push({
                role: "system",
                content: `User memories:

${memories}

Use these only if relevant. Never fabricate memories.`,
            });
        }

        finalMessages.push(...messages);

        const response = await axios.post(
            `${process.env.OLLAMA_BASE_URL}/api/chat`,
            {
                model: "gemma3:latest",
                messages: finalMessages,
                stream: false,
            }
        );

        const answer = response.data.message.content;

console.log("AI Response:");
console.log(answer);

return answer;
    } catch (error) {
        console.error(error.response?.data || error.message);
        throw new Error("Failed to generate AI response");
    }
};

export default askAI;