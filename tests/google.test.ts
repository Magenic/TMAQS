import Browser from "../browser/Browser";

describe('Google', () => {
  let driver: IDriver;

  beforeEach(async () => {
    let browser = await new Browser();
    driver = await browser.getDriver();
  });

  afterEach(async () => {
    await driver.close();
  });

  it('should display "google" text on page', async () => {
    await driver.navigateToUrl('https://google.com');
    expect(await driver.url()).toMatch('google');
  })

  it('should display "magenic automation site" on page using puppeteer wrapper', async () => {
    await driver.navigateToUrl("http://magenicautomation.azurewebsites.net/Automation");
  })

  it('should scroll into view of an element', async () => {
    await driver.navigateToUrl("http://magenicautomation.azurewebsites.net/Automation");
    await driver.scrollIntoView("#rightclickspace");
  })
})