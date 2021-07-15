import Browser from "../browser/Browser";

describe('Google', () => {
  it('should display "google" text on page', async () => {
    await page.goto('https://google.com')
    await expect(page).toMatch('google')
  })

  it('should display "magenic automation site" on page using puppeteer wrapper', async () => {
    const browser = new Browser();
    await browser.navigateToUrl("http://magenicautomation.azurewebsites.net/Automation");
    //await browser.close();
  })
})