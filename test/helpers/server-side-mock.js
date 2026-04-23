import { Header, BytesValue } from 'selenium-webdriver/bidi/networkTypes.js';
import { AddInterceptParameters } from 'selenium-webdriver/bidi/addInterceptParameters.js';
import { ContinueRequestParameters } from 'selenium-webdriver/bidi/continueRequestParameters.js';
import { InterceptPhase } from 'selenium-webdriver/bidi/interceptPhase.js';
import { MockClient } from 'request-mocking-protocol';

/**
 * Mocks a server-side request by intercepting network traffic and modifying the request/response.
 *
 * @param {object} network - The network object used to manage intercepts and requests.
 * @param {string} pageUrl - The navigation URL of the page.
 * @param {string} requestUrl - The URL of the request to mock.
 * @param {object|number} jsonBody - The JSON body to use as the mocked response or a status code for error simulation.
 */
export async function mockServerSideRequest(network, pageUrl, requestUrl, jsonBody) {
  const mockClient = new MockClient();
  const status = typeof jsonBody === 'number' ? jsonBody : 200;
  const body = typeof jsonBody === 'number' ? '' : jsonBody;

  await mockClient.GET(requestUrl, { status, body });

  await network.addIntercept(
    new AddInterceptParameters(InterceptPhase.BEFORE_REQUEST_SENT).urlStringPattern(pageUrl),
  );

  await network.beforeRequestSent(async (event) => {
    const request = event.request;
    const requestId = request.request;
    const params = new ContinueRequestParameters(requestId);
    if (request.url === pageUrl) {
      const mockHeaders = Object.entries(mockClient.headers).map(
        ([name, value]) => new Header(name, new BytesValue('string', value)),
      );
      params.headers([...request.headers, ...mockHeaders]);
    }
    await network.continueRequest(params);
  });
}

// todo: handle MaxListenersExceededWarning
// Each network.continueRequest() call adds a new WS listener
// See: https://github.com/SeleniumHQ/selenium/blob/trunk/javascript/selenium-webdriver/bidi/index.js#L117
