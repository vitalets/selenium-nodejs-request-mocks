import assert from 'assert';
import { beforeEach, afterEach, it } from 'node:test';
import { Builder, By, until } from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox.js';

let driver;

beforeEach(async () => {
  driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(new firefox.Options().enableBidi())
    .build();
});

afterEach(async () => {
  await driver.sleep(1000);
  await driver.quit();
});

it('non-empty list (no mocks)', async () => {
  await driver.get('http://localhost:3000');

  const users = await driver.wait(until.elementsLocated(By.css('.users-list li')), 3000);

  assert.equal(users.length, 6);
  assert.match(await users[0].getText(), /Leanne Graham/);
});
