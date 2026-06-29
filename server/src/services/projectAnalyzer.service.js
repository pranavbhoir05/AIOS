import { executePlan } from "./toolRouter.service.js";

export const analyzeProject = async () => {
    const tasks = [
        {
            tool: "list_directory",
            input: ".",
        },
        {
            tool: "search_files",
            input: "package.json",
        },
        {
            tool: "search_files",
            input: "README.md",
        },
        {
            tool: "search_files",
            input: "Dockerfile",
        },
        {
            tool: "search_files",
            input: ".env",
        },
    ];

    const results = await executePlan(tasks);

    return results;
};