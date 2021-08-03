import { Browser, ElementHandle, Page } from "puppeteer";

export default class PuppeteerDriver implements IDriver {
    private isHeadless = false; // should be pulled out from config file
    private browser?: Browser = undefined;
    private page?: Page = undefined;
    private storedElement?: ElementHandle = undefined;


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

    close = async (): Promise<void> => {
        return await this.page!.close();
    }

    scrollIntoView = async (selector?: string): Promise<IDriver> => {
        if (selector) {
            await this.page!.waitForSelector(selector, {visible: true}) ? 
            await this.page!.$eval(selector, (elem) => elem.scrollIntoView()) : null;
        }
        else { 
            if (this.storedElement) {
                await this.storedElement!.hover();
            }
        }
        
        return this;
    }

    url = async (): Promise<string> => {
        return await this.page!.url();
    }

    sleep = async (ms: number): Promise<void> => {
        return await this.page!.waitForTimeout(ms);
    }

    searchElement = async (selector: string): Promise<IDriver> => {
        let elements: any;
        if (selector && selector[0] === '/') {
            if (await this.page!.waitForXPath(selector, {visible: true})) {
                elements = await this.page!.$x(selector);
                if (elements && elements.length > 0) {
                    // I've stored this as this object's property so that
                    // When we do something like this:
                    // await searchElement('//div'). -> we still return IDriver for chaining
                    // and we can implement an overloaded scrollIntoView, or click for example, 
                    // where it takes no parameters (using ? operator)
                    // and uses this.element instead.
                    // Please observe the modified scrollIntoView(selector?: string) method
                    // For more examples please see this test in google.test.ts
                    // 'should search for a specific element using Xpath as selector'
                    this.storedElement = elements[0];
                }
            }
        }
        else {
            // TODO: PBI-169
        }
        // We cannot return anything other than IDriver because we need to restrict our tests
        // To just use our provided interface to avoid breaking code when changing Adapters/Drivers
        return this;
    }
}
