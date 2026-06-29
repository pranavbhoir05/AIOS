import fs from "fs/promises";

export const executeReadFileTool = async (path) => {
    try {
        const content = await fs.readFile(path, "utf8");

        return {
            success: true,
            data: content,
        };
    } catch (error) {
        return {
            success: false,
            data: error.message,
        };
    }
};