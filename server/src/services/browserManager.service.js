import { chromium } from "playwright";

let browser;
let page;

export const getPage = async () => {
    if (!browser) {
        browser = await chromium.launch({
            headless: true,
        });
    }

    if (!page) {
        page = await browser.newPage();
    }

    return page;
};

export const closeSession = async () => {
    if (page) {
        await page.close();
        page = null;
    }

    if (browser) {
        await browser.close();
        browser = null;
    }
};