import assert from 'assert';
import { beforeEach, afterEach, it, describe } from 'node:test';
import { By, until } from 'selenium-webdriver';
import { openBrowser } from './helpers/browser.js';

let driver;

beforeEach(async () => {
  driver = await openBrowser();
});

afterEach(async () => {
  await driver.quit();
});

describe('Users list (no mocks)', () => {
  it('non-empty list', async () => {
    await driver.get('http://localhost:3000');

    const users = await driver.wait(until.elementsLocated(By.css('.users-list li')), 3000);
    assert.equal(users.length, 6);
    assert.match(await users[0].getText(), /Leanne Graham/);
  });
});
