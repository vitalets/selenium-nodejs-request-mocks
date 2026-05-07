# SeleniumConf 2026: Mocking Client-Side and Server-Side API Calls with Selenium BiDi

Source code for the demo app and tests.

## Links

- View the [slides](https://vitalets.github.io/seleniumconf-slides/)
- Connect on LinkedIn with [Vitaliy Potapov](https://www.linkedin.com/in/vitalets/)
- Explore the JS implementation of [Request Mocking Protocol](https://github.com/vitalets/request-mocking-protocol)
- Learn more about [BiDi in Selenium](https://www.selenium.dev/documentation/webdriver/bidi/)

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
