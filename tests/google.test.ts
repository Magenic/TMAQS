import Browser from "../browser/Browser";

describe('Google', () => {
  const googleUrl = 'https://google.com';
  const magenicAutomationSite = "http://magenicautomation.azurewebsites.net/Automation";
  let driver: IDriver;

  beforeEach(async () => {
    let browser = await new Browser();
    driver = await browser.getDriver();
  });

  afterEach(async () => {
    await driver.close();
  });

  it('should display "google" text on page', async () => {
    await driver.navigateToUrl(googleUrl);
    expect(await driver.url()).toMatch('google');
  })

  it('should display "magenic automation site" on page using puppeteer wrapper', async () => {
    await driver.navigateToUrl(magenicAutomationSite);
  })

  it('should scroll into view of an element', async () => {
    await driver.navigateToUrl(magenicAutomationSite);
    await driver.scrollIntoView("#rightclickspace");
  })

  it('should search for an element via xpath then scrolls into view using that element', async () => {
    await driver.navigateToUrl(magenicAutomationSite);
    const elem = (await driver.searchElement("//*[@id='rightclickspace']")).scrollIntoView();
    expect(elem).toBeTruthy();
  })
})