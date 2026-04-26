import assert from 'assert';
import { beforeEach, afterEach, describe, it } from 'node:test';
import { Builder, By, until } from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox.js';
import { Network as getNetwork } from 'selenium-webdriver/bidi/network.js';
import { mockClientSideRequest } from './helpers/client-side-mock.js';

let driver;
let network;

beforeEach(async () => {
  driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(new firefox.Options().enableBidi())
    .build();
  network = await getNetwork(driver);
});

afterEach(async () => {
  await network.close();
  await driver.quit();
});

describe('Users list (client-side mocks)', () => {
  it('non-empty list', async () => {
    await mockClientSideRequest(network, 'https://jsonplaceholder.typicode.com/users?_limit=6', [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ]);

    await driver.get('http://localhost:3000');

    const users = await driver.wait(until.elementsLocated(By.css('.users-list li')), 3000);
    assert.equal(users.length, 2);
    assert.match(await users[0].getText(), /User 1/);
  });

  it('empty list', async () => {
    await mockClientSideRequest(network, 'https://jsonplaceholder.typicode.com/users?_limit=6', []);

    await driver.get('http://localhost:3000');

    const content = await driver.wait(until.elementLocated(By.css('.empty')), 3000);
    assert.match(await content.getText(), /No users found/);
  });

  it('error', async () => {
    await mockClientSideRequest(
      network,
      'https://jsonplaceholder.typicode.com/users?_limit=6',
      500,
    );

    await driver.get('http://localhost:3000');

    const content = await driver.wait(until.elementLocated(By.css('.error')), 3000);
    assert.match(await content.getText(), /Error: 500/);
  });
});
