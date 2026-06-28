import { TavilyClient } from "@tavily/core";

const tavily = new TavilyClient({
    apiKey: process.env.TAVILY_API_KEY,
});

export const searchWeb = async (query) => {
    const response = await tavily.search(query, {
        searchDepth: "advanced",
        maxResults: 5,
    });

    return response.results
        .map(
            (r) => `${r.title}

${r.content}

${r.url}`
        )
        .join("\n\n--------------------\n\n");
};