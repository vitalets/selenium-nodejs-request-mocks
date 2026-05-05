# SeleniumConf 2026: Mocking client-side and server-side API calls with Selenium BiDi

## Links

- [Slides](tbd)
- [Request Mocking Protocol](https://github.com/vitalets/request-mocking-protocol)
- [BiDi in Selenium](https://www.selenium.dev/documentation/webdriver/bidi/)
- [BiDi support in major browsers](https://wpt.fyi/results/webdriver/tests/bidi)

## Running the Demo

1. Clone the repo:

   ```
   git clone https://github.com/vitalets/selenium-nodejs-request-mocks.git
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Run dev server:

   ```
   npm run dev
   ```

4. Open new terminal and run tests **without mocks**:

   ```
   npm run test
   ```

5. Run tests with **client-side mocks**:

   ```
   npm run test:client-mocks
   ```

6. Run tests with **server-side mocks**:

   ```
   npm run test:server-mocks
   ```
