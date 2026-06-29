import { getPage } from "../../browserManager.service.js";

export const executeBrowserTypeTool = async ({ selector, text }) => {
    try {
        const page = await getPage();

        await page.fill(selector, text);

        return {
            success: true,
            data: `Typed into ${selector}`,
        };
    } catch (error) {
        return {
            success: false,
            data: error.message,
        };
    }
};