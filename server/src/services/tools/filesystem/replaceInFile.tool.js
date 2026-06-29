import fs from "fs/promises";

export const executeReplaceInFileTool = async ({
    path,
    search,
    replace,
}) => {
    try {
        const content = await fs.readFile(path, "utf8");

        const updated = content.replace(search, replace);

        await fs.writeFile(path, updated, "utf8");

        return {
            success: true,
            data: `Updated ${path}`,
        };
    } catch (error) {
        return {
            success: false,
            data: error.message,
        };
    }
};