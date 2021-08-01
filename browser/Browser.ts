import PuppeteerDriver from "../driver/PuppeteerDriver";

export default class Browser {
  private driver: IDriver;

  constructor() {
    // Commenting this out
    // So we can use this when Config is implemented
    // For now we'll use direct instantiation, new PuppeteerDriver();
    // Use this import to use Config -> import Config from "../config/Config"
    //
    //this.driver = new Config().getUIDriver();
    this.driver = new PuppeteerDriver();
  }

  getDriver = async () => {
    return await this.driver.getDriver();
  }

  navigateToUrl = async (url: string) => {
    await this.driver.navigateToUrl(url);
  };

  close = async () => {
    await this.driver.close();
  }

  scrollIntoView = async (selector: string) => {
    await this.driver.scrollIntoView(selector);
  }

  sleep = async (ms: number) => {
    await this.driver.sleep(ms);
  }
}