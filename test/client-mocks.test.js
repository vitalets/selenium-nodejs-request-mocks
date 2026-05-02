import assert from 'assert';
import { beforeEach, afterEach, it } from 'node:test';
import { setTimeout } from 'timers/promises';
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
  await setTimeout(1000);
  await network.close();
  await driver.quit();
});

it('non-empty list (client mocks)', async () => {
  await mockClientSideRequest(network, 'https://jsonplaceholder.typicode.com/users?_limit=6', [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
  ]);

  await driver.get('http://localhost:3000');
  const users = await driver.wait(until.elementsLocated(By.css('.users-list li')), 3000);

  assert.equal(users.length, 2);
  assert.match(await users[0].getText(), /User 1/);
});

it('empty list (client mocks)', async () => {
  await mockClientSideRequest(network, 'https://jsonplaceholder.typicode.com/users?_limit=6', []);

  await driver.get('http://localhost:3000');
  const content = await driver.wait(until.elementLocated(By.css('.empty')), 3000);

  assert.match(await content.getText(), /No users found/);
});

it('error (client mocks)', async () => {
  await mockClientSideRequest(network, 'https://jsonplaceholder.typicode.com/users?_limit=6', 500);

  await driver.get('http://localhost:3000');
  const content = await driver.wait(until.elementLocated(By.css('.error')), 3000);

  assert.match(await content.getText(), /Error: 500/);
});
