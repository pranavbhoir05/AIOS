import axios from "axios";
import { OLLAMA_CONFIG } from "../config/ollama.config.js";

const generateTitle = async (message) => {
    try {
        const response = await axios.post(
            `${OLLAMA_CONFIG.baseUrl}/api/generate`,
            {
                model: "gemma3:4b",
                prompt: `
Generate a short conversation title.

Rules:
- Maximum 5 words.
- No quotes.
- No punctuation.
- Return only the title.

User:
${message}
`,
                stream: false,
            }
        );

        return response.data.response.trim();
    } catch (error) {
        return "New Chat";
    }
};

export default generateTitle;