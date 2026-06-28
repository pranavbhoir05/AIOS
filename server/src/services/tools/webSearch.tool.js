import { tavily } from "@tavily/core";

const tvly = tavily({
    apiKey: process.env.TAVILY_API_KEY,
});

export const executeWebSearchTool = async (query) => {
    try {
       const response = await tvly.search(query, {
            searchDepth: "advanced",
            maxResults: 5,
        });

        const results = response.results
            .map(
                (item) => `
Title: ${item.title}

Content: ${item.content}

URL: ${item.url}
`
            )
            .join("\n-------------------------\n");

        return {
            success: true,
            data: results,
        };
    } catch (error) {
        console.error("Web Search Error:", error.message);

        return {
            success: false,
            data: "Failed to search the web.",
        };
    }
};