import assert from "assert";
import { before, after, it } from "node:test";
import { By, Builder, until } from "selenium-webdriver";
import Chrome from "selenium-webdriver/chrome.js";
import { Network as getNetwork } from "selenium-webdriver/bidi/network.js";
import { mockClientSideRequest } from "./helpers/client-side-mock.js";

let driver;
let network;

before(async () => {
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new Chrome.Options().enableBidi())
    .build();

  network = await getNetwork(driver);
});

after(async () => {
  await network.close();
  await driver.quit();
});

it("Render users (client-side-mock)", async () => {
  await mockClientSideRequest(network, "https://jsonplaceholder.typicode.com/users", [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
  ]);

  await driver.get("http://localhost:3000/client-side-api-call");
  const users = await driver.wait(until.elementsLocated(By.css("li")), 3000);

  assert.equal(users.length, 2);
  assert.equal(await users[0].getText(), "User 1");
});
