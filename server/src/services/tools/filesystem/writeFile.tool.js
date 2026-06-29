import fs from "fs/promises";

export const executeWriteFileTool = async ({
    path,
    content,
}) => {
    try {
        await fs.writeFile(path, content, "utf8");

        return {
            success: true,
            data: `Successfully wrote ${path}`,
        };
    } catch (error) {
        return {
            success: false,
            data: error.message,
        };
    }
};