import { Header } from "selenium-webdriver/bidi/networkTypes.js";

// See: https://github.com/SeleniumHQ/selenium/pull/16321
Header.prototype.asMap = function () {
  const map = new Map();
  map.set("name", this.name);
  map.set("value", Object.fromEntries(this.value.asMap()));
  return map;
};

export { Header };
