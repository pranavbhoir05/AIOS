import { getPage } from "../../browserManager.service.js";

export const executeBrowserClickTool = async (selector) => {
    try {
        const page = await getPage();

        await page.click(selector);

        return {
            success: true,
            data: `Clicked ${selector}`,
        };
    } catch (error) {
        return {
            success: false,
            data: error.message,
        };
    }
};