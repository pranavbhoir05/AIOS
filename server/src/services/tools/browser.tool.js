import { chromium } from "playwright";
import { getBrowser } from "../browserSession.service.js";

export const executeBrowserTool = async (url) => {
    let browser;

    try {
        const browser = await getBrowser();;

        const page = await browser.newPage();

        await page.goto(url, {
            waitUntil: "networkidle",
            timeout: 30000,
        });

        const title = await page.title();

        const text = await page.locator("body").innerText();

        return {
            success: true,
            data: {
                title,
                content: text.substring(0, 8000),
            },
        };
    } catch (error) {
        return {
            success: false,
            data: error.message,
        };
    }
};