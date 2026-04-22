import assert from 'assert';
import { before, after, it } from 'node:test';
import { By, until } from 'selenium-webdriver';
import { openBrowser } from './helpers/browser.js';

let driver;

before(async () => {
  driver = await openBrowser();
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
