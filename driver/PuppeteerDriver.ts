import { Page } from "puppeteer";

export default class PuppeteerDriver implements IDriver {
    private isHeadless = false; // should be pulled out from config file
    private page?: Page = undefined;

    getDriver = async () =>  {
        if (this.page === undefined) {
            const browser = await await require('puppeteer').launch({
                product: "chrome",
                headless: this.isHeadless,
                args: ["--start-maximized"],
                defaultViewport: null,
            });
            this.page = (await browser.pages())[0];
        }
        return this as unknown as IDriver;
    };

    navigateToUrl = async (url: string) => {
        await this.page!.goto(url);
        return this as unknown as IDriver;
    };

    close = async () => {
        await this.page!.close();
    }

    scrollIntoView = async (selector: string) => {
        await this.page!.waitForSelector(selector, {visible: true}) ? 
        await this.page!.$eval(selector, (elem) => elem.scrollIntoView()) : null;
        return this as unknown as IDriver;
    }

    url = async () => {
        return await this.page!.url();
    }

    waitForTimeout = async (ms: number) => {
        await this.page!.waitForTimeout(ms);
    }
}