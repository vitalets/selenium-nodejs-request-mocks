import { setTimeout as delay } from 'timers/promises';
import { Builder } from 'selenium-webdriver';
import { Network as getNetwork } from 'selenium-webdriver/bidi/network.js';
import chrome from 'selenium-webdriver/chrome.js';
import firefox from 'selenium-webdriver/firefox.js';

export { getNetwork };

export async function openBrowser() {
  return (
    new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(
        new firefox.Options()
          // .addArguments('-headless')
          .enableBidi(),
      )
      // .forBrowser('chrome')
      // .setChromeOptions(new chrome.Options().enableBidi())
      .build()
  );
}

export async function closeBrowser(driver) {
  await driver.quit();
  await delay(1000);
}
