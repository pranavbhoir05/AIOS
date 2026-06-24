import axios from "axios";

const askAI = async (messages) => {
    try {
        const prompt = messages
            .map((msg) => `${msg.role}: ${msg.content}`)
            .join("\n");

        const response = await axios.post(
            `${process.env.OLLAMA_BASE_URL}/api/generate`,
            {
                model: "gemma3:4b",
                prompt,
                stream: false,
            }
        );

        return response.data.response;
    } catch (error) {
        console.error(error.response?.data || error.message);
        throw new Error("Failed to generate AI response");
    }
};

export default askAI;