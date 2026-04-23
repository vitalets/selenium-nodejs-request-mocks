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
    const users = await driver.wait(until.elementsLocated(By.css('li')), 3000);
    assert.equal(users.length, 10);
    assert.equal(await users[0].getText(), 'Leanne Graham');
  });

  it.skip('empty list', async () => {
    // no way to emulate
  });

  it.skip('error', async () => {
    // no way to emulate
  });
});
