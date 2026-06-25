import axios from "axios";

const generateTitle = async (message) => {
    try {
        const response = await axios.post(
            `${process.env.OLLAMA_BASE_URL}/api/generate`,
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