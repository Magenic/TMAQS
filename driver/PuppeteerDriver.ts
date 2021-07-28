import puppeteer from "puppeteer";

export default class PuppeteerDriver implements IDriver {
    private isHeadless = false; // should be pulled out from config file
    createBrowserPage = async (url: string) => {
        const browser = await puppeteer.launch({               
            headless: this.isHeadless,
            defaultViewport: null,
            args: ["--start-maximized"],
            executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        });        
        const page = await browser.newPage();        
        await page.goto(url);
    };

    close = async () => {
        browser.close;
    }
}