import { Browser, ElementHandle, Page } from "puppeteer";
import PuppeteerElement from "./PuppeteerElement";

export default class PuppeteerDriver implements IDriver {
    private isHeadless = false; // should be pulled out from config file
    private browser?: Browser = undefined;
    private page?: Page = undefined;


    getDriver = async (): Promise<IDriver> =>  {
        if (this.browser === undefined) {
            this.browser = await require('puppeteer').launch({
                headless: this.isHeadless,
                defaultViewport: null,
                args: ["--start-maximized"],
                executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
            });
            if (this.page === undefined) {
                this.page = (await this.browser!.pages())[0];
            }
        }
        return this;
    };

    navigateToUrl = async (url: string): Promise<IDriver> => {
        await this.page!.goto(url);
        return this;
    };

    close = async (): Promise<IDriver> => {
        await this.page!.close();
        return this;
    }

    scrollIntoView = async (selector: string): Promise<IDriver> => {
        await this.page!.waitForSelector(selector, {visible: true}) ? 
        await this.page!.$eval(selector, (elem) => elem.scrollIntoView()) : null;

        return this;
    }

    url = async (): Promise<string> => {
        return await this.page!.url();
    }

    sleep = async (ms: number): Promise<IDriver> => {
        await this.page!.waitForTimeout(ms);
        return this;
    }

    searchElement = async (selector: string): Promise<IElement> => {
        let elements: Array<ElementHandle>;
        let element: ElementHandle;
        if (selector && selector[0] === '/') {
            if (await this.page!.waitForXPath(selector, {visible: true})) {
                elements = await this.page!.$x(selector);
                if (elements && elements.length > 0) {
                    element = elements[0]!;
                }
            }
        }
        else {
            // TODO: PBI-169
        }
        return new PuppeteerElement(element!);
    }
}
