import fs from "fs/promises";
import path from "path";

async function walk(dir, results = []) {
    const entries = await fs.readdir(dir, {
        withFileTypes: true,
    });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            if (
                entry.name === "node_modules" ||
                entry.name === ".git"
            ) {
                continue;
            }

            await walk(fullPath, results);
        } else {
            results.push(fullPath);
        }
    }

    return results;
}

export const executeSearchFilesTool = async (query) => {
    try {
        const files = await walk(".");

        const matches = files.filter((file) =>
            file.toLowerCase().includes(query.toLowerCase())
        );

        return {
            success: true,
            data: matches,
        };
    } catch (error) {
        return {
            success: false,
            data: error.message,
        };
    }
};