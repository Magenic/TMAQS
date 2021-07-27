import Config from "../config/Config"

export default class Browser {
  private driver: IDriver;

  constructor() {
    this.driver = new Config().getUIDriver();
  }

  getDriver(): IDriver {
    return this.driver;
  }

  navigateToUrl = async (url: string) => {
    this.driver.createBrowserPage(url);
  };

  close = async () => {
    this.driver.close();
  }
}