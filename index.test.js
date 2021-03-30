// Require modules used in the logic below
const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

let driver;

describe('test google.com', () => {

   beforeEach(() => {
      driver = new Builder()
         .forBrowser('chrome')
         .build();
   });

   afterEach(async () => {
      await driver.quit();
   });

   it('should open google search', async () => {
      await driver.get('http://www.google.com');
      let title = await driver.getTitle();
      expect(title).toEqual('Google');
   });

   it('should Search selenium in google search', async () => {
      let keyword = 'selenium';
      await driver.get('http://www.google.com');
      // let element = await driver.findElement(By.css('input[title=Search]'));
      await driver.findElement(By.name('q')).sendKeys(keyword, Key.RETURN);
      // await element.sendKeys(keyword, Key.RETURN);
      await driver.wait(until.titleContains(keyword), 8000);
      let title = await driver.getTitle();

      expect(title).toContain(keyword);
   });

});