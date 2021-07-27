import { HtmlOptions } from "istanbul-reports";

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

        await page.waitForTimeout(1000)

        const welcomeMessage = await page.$eval('#WelcomeMessage', el => el.innerHTML)
        await expect(welcomeMessage).toEqual('Welcome Home')
    })

    it("Invalid Login", async () => {
        await page.type('#UserName', 'Teddy')
        await page.type('#Password', '123')
        await page.click('#Login')
        const loginErrorMessage = await page.$eval('#LoginError', el => el.innerHTML)
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
        
        // const selectedValue = await page.$eval('#Selector', el => (el as HTMLInputElement).value) ;
        // await expect(selectedValue.toString()).toEqual(valueToSelect)
    })

    it("Select Item From Dropdown", async () => {
        await page.goto("http://magenicautomation.azurewebsites.net/Automation");

        const valueToSelect = 'six'
        await page.select('#namesDropdown', valueToSelect);

        const selectedByValue = page.$eval('#namesDropdown > option[value="' + valueToSelect + '"]', el => el.value);
        const selectedByText = page.$eval('#namesDropdown > option[value="' + valueToSelect + '"]', el => el.innerText);

        await expect(await selectedByValue).toEqual(valueToSelect);
        await expect(await selectedByText).toEqual('Emily');
    })

    it("Select One Item From List Element", async () => {
        await page.goto("http://magenicautomation.azurewebsites.net/Automation");

        const valueToSelect = 'three'
        await page.select('#computerParts', valueToSelect);

        const selectedByValue = page.$eval('#computerParts > option[value="' + valueToSelect + '"]', el => el.value);
        const selectedByText = page.$eval('#computerParts > option[value="' + valueToSelect + '"]', el => el.innerText);

        await expect(await selectedByValue).toEqual(valueToSelect);
        await expect(await selectedByText).toEqual('Hard Drive');
    })
})