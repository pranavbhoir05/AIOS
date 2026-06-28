import { getPage } from "../../browserManager.service.js";

export const executeBrowserExtractTool = async () => {
    try {
        const page = await getPage();

        const content = await page.locator("body").innerText();

        return {
            success: true,
            data: {
                title: await page.title(),
                content,
            },
        };
    } catch (error) {
        return {
            success: false,
            data: error.message,
        };
    }
};