import { getPage } from "../../browserManager.service.js";

export const executeBrowserOpenTool = async (url) => {
    try {
        const page = await getPage();

        await page.goto(url, {
            waitUntil: "networkidle",
        });

        return {
            success: true,
            data: {
                title: await page.title(),
                url: page.url(),
            },
        };
    } catch (error) {
        return {
            success: false,
            data: error.message,
        };
    }
};