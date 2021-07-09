describe("Training Page 2 Tests", () => {
    var fs = require('fs');
    var dir = './screenshots';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    
    beforeEach(async () => {
        await page.goto("http://magenicautomation.azurewebsites.net/Static/Training2/loginpage.html");
    })
    afterEach(async () => {
        await page.screenshot({ path: `./screenshots/${await expect.getState().currentTestName}.png` })
    })

    it("Valid Login", async () => {
        await page.type('#UserName', 'Ted')
        await page.type('#Password', '123')
        await page.click('#Login')
        const welcomeMessage = await page.$eval('#WelcomeMessage', el => el.innerText)
        await expect(welcomeMessage).toEqual('Welcome Home')
    })

    it("Invalid Login", async () => {
        await page.type('#UserName', 'Teddy')
        await page.type('#Password', '123')
        await page.click('#Login')
        const loginErrorMessage = await page.$eval('#LoginError', el => el.innerText)
        await expect(loginErrorMessage).toContain('Invalid')
    })

    it("Async Page, Select from dropdown", async () => {
        const valueToSelect = 'Second'
        await page.type('#UserName', 'Ted')
        await page.type('#Password', '123')
        await page.click('#Login')

        await page.waitForTimeout(1000) //workaround for page.waitForNavigation()
        await page.click('#Async')

        await page.waitForTimeout(1000) //workaround for page.waitForNavigation()
        await page.waitForSelector('#AsyncContent', { visible: true })
        await page.select('#Selector', valueToSelect)

        const selectedValue = page.$eval('#Selector', el => el.value)
        await expect(await selectedValue).toEqual(valueToSelect)
    })

})