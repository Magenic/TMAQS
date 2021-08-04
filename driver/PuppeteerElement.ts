import { ElementHandle } from "puppeteer";

export default class PuppeteerElement implements IElement {
    constructor(private elem: ElementHandle) {
        this.elem = elem;
    }

    click = async (): Promise<IElement> => {
        await this.elem.click();
        return this;
    }
    
    type = async (text: string): Promise<IElement> => {
        await this.elem.type(text);
        return this;
    }

    scrollIntoView = async (): Promise<IElement> => {
        await this.elem.hover();
        return this;
    }

    searchElement = async (selector: string): Promise<IElement> => {
        let element: ElementHandle;
        if (selector && selector[0] === '/') {
            element = (await this.elem.$x(selector))[0]!;
        }
        else {
            element = (await this.elem.$(selector))!;
        }
        return new PuppeteerElement(element!);
    }
}