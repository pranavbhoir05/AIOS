import { chromium } from "playwright";

let browser = null;

export const getBrowser = async () => {
    if (!browser) {
        browser = await chromium.launch({
            headless: true,
        });
    }

    return browser;
};

export const closeBrowser = async () => {
    if (browser) {
        await browser.close();
        browser = null;
    }
};