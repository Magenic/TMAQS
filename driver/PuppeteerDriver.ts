import { Page, Browser } from "puppeteer";

export default class PuppeteerDriver implements IDriver {
    private isHeadless = false; // should be pulled out from config file
    private browser?: Browser = undefined;
    private page?: Page = undefined;


    getDriver = async (): Promise<IDriver> =>  {
        if (this.browser === undefined) {
            this.browser = await await require('puppeteer').launch({
                product: "chrome",
                headless: this.isHeadless,
                args: ["--start-maximized"],
                defaultViewport: null,
                executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
            });
            if (this.page === undefined) {
                this.page = (await this.browser!.pages())[0];
            }
        }
        return this as unknown as IDriver;
    };

    navigateToUrl = async (url: string): Promise<IDriver> => {
        await this.page!.goto(url);
        return this as unknown as IDriver;
    };

    close = async (): Promise<void> => {
        await this.page!.close();
    }

    scrollIntoView = async (selector: string): Promise<IDriver> => {
        await this.page!.waitForSelector(selector, {visible: true}) ? 
        await this.page!.$eval(selector, (elem) => elem.scrollIntoView()) : null;
        return this as unknown as IDriver;
    }

    url = async (): Promise<string> => {
        return await this.page!.url();
    }

    sleep = async (ms: number): Promise<void> => {
        await this.page!.waitForTimeout(ms);
    }
}
