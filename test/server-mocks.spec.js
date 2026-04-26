import assert from 'assert';
import { setTimeout as sleep } from 'timers/promises';
import { beforeEach, afterEach, it } from 'node:test';
import { Builder, By, until } from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox.js';
import { Network as getNetwork } from 'selenium-webdriver/bidi/network.js';
import { mockServerSideRequest } from './helpers/server-side-mock.js';

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
  await sleep(2000);
  await network.close();
  await driver.quit();
});

it('non-empty list (server mocks)', async () => {
  await mockServerSideRequest(
    network,
    'http://localhost:3000/ssr',
    'https://jsonplaceholder.typicode.com/users*',
    [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ],
  );

  await driver.get('http://localhost:3000/ssr');

  const users = await driver.wait(until.elementsLocated(By.css('.users-list li')), 3000);
  assert.equal(users.length, 2);
  assert.match(await users[0].getText(), /User 1/);
});

it('empty list (server mocks)', async () => {
  await mockServerSideRequest(
    network,
    'http://localhost:3000/ssr',
    'https://jsonplaceholder.typicode.com/users*',
    [],
  );

  await driver.get('http://localhost:3000/ssr');

  const content = await driver.wait(until.elementLocated(By.css('.empty')), 3000);
  assert.match(await content.getText(), /No users found/);
});

it('error (server mocks)', async () => {
  await mockServerSideRequest(
    network,
    'http://localhost:3000/ssr',
    'https://jsonplaceholder.typicode.com/users*',
    500,
  );

  await driver.get('http://localhost:3000/ssr');

  const content = await driver.wait(until.elementLocated(By.css('.error')), 3000);
  assert.match(await content.getText(), /Error: 500/);
});
