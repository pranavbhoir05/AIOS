import { executePlan } from "./toolRouter.service.js";

const IMPORTANT_FILES = [
    "package.json",
    "README.md",
    "Dockerfile",
    ".env",
    "server.js",
    "app.js",
    "index.js",
    "main.js",
    "src/index.js",
    "src/app.js",
    "src/main.js",
];

export const exploreProject = async () => {
    const tasks = IMPORTANT_FILES.map((file) => ({
        tool: "search_files",
        input: file,
    }));

    const searchResults = await executePlan(tasks);

    const readTasks = [];

    for (const result of searchResults) {
        if (!result.output?.success) continue;

        for (const file of result.output.data || []) {
            readTasks.push({
                tool: "read_file",
                input: file,
            });
        }
    }

    const fileContents =
        readTasks.length > 0
            ? await executePlan(readTasks)
            : [];

    return {
        searchResults,
        fileContents,
    };
};