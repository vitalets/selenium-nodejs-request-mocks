import assert from "assert";
import { before, after, it } from "node:test";
import { By, Builder, until } from "selenium-webdriver";

let driver;

before(async () => {
  driver = await new Builder().forBrowser("chrome").build();
});

it("Render users (no-mocks)", async () => {
  await driver.get("http://localhost:3000/client-side-api-call");

  const users = await driver.wait(until.elementsLocated(By.css("li")), 3000);

  assert.equal(users.length, 10);
  assert.equal(await users[0].getText(), "Leanne Graham");
});

after(async () => {
  await driver.quit();
});
