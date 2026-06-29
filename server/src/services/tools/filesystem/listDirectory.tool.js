import fs from "fs/promises";

export const executeListDirectoryTool = async (path = ".") => {
    try {
        const entries = await fs.readdir(path, {
            withFileTypes: true,
        });

        return {
            success: true,
            data: entries.map((entry) => ({
                name: entry.name,
                type: entry.isDirectory() ? "directory" : "file",
            })),
        };
    } catch (error) {
        return {
            success: false,
            data: error.message,
        };
    }
};