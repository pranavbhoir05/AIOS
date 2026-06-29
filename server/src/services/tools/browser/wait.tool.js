import { getPage } from "../../browserManager.service.js";

export const executeBrowserWaitTool = async (input = {}) => {
    try {
        const page = await getPage();

        if (typeof input === "number") {
            await page.waitForTimeout(input);
        } else if (input.selector) {
            await page.waitForSelector(input.selector, {
                timeout: input.timeout || 10000,
            });
        } else {
            await page.waitForLoadState("networkidle");
        }

        return {
            success: true,
            data: "Wait completed",
        };
    } catch (error) {
        return {
            success: false,
            data: error.message,
        };
    }
};