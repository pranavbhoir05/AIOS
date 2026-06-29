import { getPage } from "../../browserManager.service.js";

export const executeBrowserScreenshotTool = async (fileName = "screenshot.png") => {
    try {
        const page = await getPage();

        await page.screenshot({
            path: `screenshots/${fileName}`,
            fullPage: true,
        });

        return {
            success: true,
            data: {
                path: `screenshots/${fileName}`,
            },
        };
    } catch (error) {
        return {
            success: false,
            data: error.message,
        };
    }
};