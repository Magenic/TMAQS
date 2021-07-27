import PuppeteerDriver from "../driver/PuppeteerDriver";

export default class Config {

    getUIDriver = () => {
      
      return new PuppeteerDriver();
      // probably a dependcy injection here
      // return new SeleniumUIDriver();
    };
  }