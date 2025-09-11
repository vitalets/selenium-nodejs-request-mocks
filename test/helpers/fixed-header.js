import { Header } from "selenium-webdriver/bidi/networkTypes.js";

Header.prototype.asMap = function () {
  const map = new Map();
  map.set("name", this.name);
  map.set("value", Object.fromEntries(this.value.asMap()));
  return map;
};

export { Header };
