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
 * @param {object} jsonBody - The JSON body to use as the mocked response.
 */
export async function mockServerSideRequest(network, pageUrl, requestUrl, jsonBody) {
  const mockClient = new MockClient();
  await mockClient.GET(requestUrl, { body: jsonBody });

  await network.addIntercept(
    new AddInterceptParameters(InterceptPhase.BEFORE_REQUEST_SENT).urlStringPattern(pageUrl),
  );

  await network.beforeRequestSent(async (event) => {
    const request = event.request;
    const requestId = request.request;
    if (request.url === pageUrl) {
      const mockHeaders = Object.entries(mockClient.headers).map(
        ([name, value]) => new Header(name, new BytesValue('string', value)),
      );
      const params = new ContinueRequestParameters(requestId).headers([
        ...request.headers,
        ...mockHeaders,
      ]);
      await network.continueRequest(params);
    }
  });
}
