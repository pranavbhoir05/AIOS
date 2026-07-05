import fs from "fs/promises";
import path from "path";

const ALLOWED_EXTENSIONS = new Set([
    ".js",
    ".ts",
    ".json",
    ".md",
    ".env",
]);

async function walk(dir, files = []) {
    const entries = await fs.readdir(dir, {
        withFileTypes: true,
    });

    for (const entry of entries) {
        if (
            entry.name === "node_modules" ||
            entry.name === ".git"
        ) {
            continue;
        }

        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            await walk(fullPath, files);
        } else {
            files.push(fullPath);
        }
    }

    return files;
}

export const executeSearchCodeTool = async (query) => {
    try {
        const files = await walk(process.cwd());

        const results = [];

        for (const file of files) {
            if (!ALLOWED_EXTENSIONS.has(path.extname(file))) {
                continue;
            }

            const content = await fs.readFile(file, "utf8");
            const lines = content.split("\n");

            lines.forEach((line, index) => {
                if (
                    line.toLowerCase().includes(query.toLowerCase())
                ) {
                    results.push({
                        file,
                        line: index + 1,
                        match: line.trim(),
                        context: lines.slice(
                            Math.max(0, index - 2),
                            Math.min(lines.length, index + 3)
                        ),
                    });
                }
            });
        }

        return {
            success: true,
            data: results,
        };
    } catch (err) {
        return {
            success: false,
            data: err.message,
        };
    }
};