import assert from 'assert';
import { before, after, it } from 'node:test';
import { By, until } from 'selenium-webdriver';
import { openBrowser, getNetwork } from './helpers/browser.js';
import { mockServerSideRequest } from './helpers/server-side-mock.js';

let driver;
let network;

before(async () => {
  driver = await openBrowser();
  network = await getNetwork(driver);
});

after(async () => {
  await network.close();
  await driver.quit();
});

it('Render users (server-side-mock)', async () => {
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
