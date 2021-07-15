import puppeteer from "puppeteer";

export default class PuppeteerDriver implements IDriver {
    private isHeadless = false; // should be pulled out from config file
    createBrowserPage = async (url: string) => {
        const browser = await puppeteer.launch({
            product: "chrome",            
            headless: this.isHeadless,
            args: ["--start-maximized"],
        });
        const page = await browser.newPage();
        await page.goto(url);
    };

    close = async () => {
        browser.close;
    }
}