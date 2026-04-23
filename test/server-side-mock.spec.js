import assert from 'assert';
import { beforeEach, afterEach, describe, it } from 'node:test';
import { By, until } from 'selenium-webdriver';
import { openBrowser, getNetwork } from './helpers/browser.js';
import { mockServerSideRequest } from './helpers/server-side-mock.js';

let driver;
let network;

beforeEach(async () => {
  driver = await openBrowser();
  network = await getNetwork(driver);
});

afterEach(async () => {
  await network.close();
  await driver.quit();
});

describe('Users list (server-side mocks)', () => {
  it('non-empty list', async () => {
    await mockServerSideRequest(
      network,
      'http://localhost:3000/ssr',
      'https://jsonplaceholder.typicode.com/users',
      [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
      ],
    );
    await driver.get('http://localhost:3000/ssr');
    const users = await driver.wait(until.elementsLocated(By.css('li')), 3000);

    assert.equal(users.length, 2);
    assert.equal(await users[0].getText(), 'User 1');
  });

  it('empty list', async () => {
    await mockServerSideRequest(
      network,
      'http://localhost:3000/ssr',
      'https://jsonplaceholder.typicode.com/users',
      [],
    );
    await driver.get('http://localhost:3000/ssr');
    const content = await driver.wait(until.elementLocated(By.css('.empty')), 3000);
    assert.equal(await content.getText(), 'No users found.');
  });

  it('error', async () => {
    await mockServerSideRequest(
      network,
      'http://localhost:3000/ssr',
      'https://jsonplaceholder.typicode.com/users',
      500,
    );
    await driver.get('http://localhost:3000/ssr');
    const content = await driver.wait(until.elementLocated(By.css('.error')), 3000);
    assert.match(await content.getText(), /Error: 500/);
  });
});
