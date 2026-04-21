import assert from 'assert';
import { before, after, it } from 'node:test';
import { By, Builder, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

let driver;

before(async () => {
  driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().enableBidi())
    .build();
});

after(async () => {
  await driver.quit();
});

it('Render users (no-mocks)', async () => {
  await driver.get('http://localhost:3000');

  const users = await driver.wait(until.elementsLocated(By.css('li')), 3000);

  assert.equal(users.length, 10);
  assert.equal(await users[0].getText(), 'Leanne Graham');
});
