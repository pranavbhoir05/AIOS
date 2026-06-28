import axios from "axios";
import MEMORY_PROMPT from "../config/memoryPrompt.js";

export const extractMemoryWithAI = async (message) => {
    console.log("extractMemoryWithAI() called");
    try {
        console.log("Memory Input:");
console.log(message);
        const response = await axios.post(
            `${process.env.OLLAMA_BASE_URL}/api/chat`,
            {
                model: "gemma3:latest",
                messages: [
                    {
                        role: "system",
                        content: MEMORY_PROMPT,
                    },
                    {
                        role: "user",
                        content: message,
                    },
                ],
                stream: false,
                format: "json",
            }
        );

        const parsed = JSON.parse(response.data.message.content);

console.log("Memory AI Output:");
console.log(parsed);

return parsed;
    } catch (error) {
        console.error("Memory AI:", error.message);

        return {
            shouldStore: false,
        };
    }
};