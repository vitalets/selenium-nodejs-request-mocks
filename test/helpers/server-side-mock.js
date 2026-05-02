import { Header, BytesValue } from 'selenium-webdriver/bidi/networkTypes.js';
import { AddInterceptParameters } from 'selenium-webdriver/bidi/addInterceptParameters.js';
import { ContinueRequestParameters } from 'selenium-webdriver/bidi/continueRequestParameters.js';
import { InterceptPhase } from 'selenium-webdriver/bidi/interceptPhase.js';

/**
 * Mocks a server-side request by intercepting network traffic and modifying the request/response.
 *
 * @param {object} network - The network object used to manage intercepts and requests.
 * @param {string} pageUrl - The navigation URL of the page.
 * @param {string} requestUrl - The URL of the request to mock.
 * @param {object|number} jsonBody - The JSON body to use as the mocked response or a status code for error simulation.
 */
export async function mockServerSideRequest(network, pageUrl, requestUrl, jsonBody) {
  // setup interception of page navigation request
  await network.addIntercept(
    new AddInterceptParameters(InterceptPhase.BEFORE_REQUEST_SENT).urlStringPattern(pageUrl),
  );

  // define a custom header with mock info
  const customHeader = buildHeader('x-mock-request', [
    {
      reqSchema: {
        url: requestUrl,
      },
      resSchema: {
        status: getMockStatus(jsonBody),
        body: getMockBody(jsonBody),
      },
    },
  ]);

  // when page navigation occurs, inject the custom header
  await network.beforeRequestSent(async (event) => {
    const request = event.request;
    const requestId = request.request;
    const params = new ContinueRequestParameters(requestId);
    if (request.url === pageUrl) {
      params.headers([...request.headers, customHeader]);
    }
    await network.continueRequest(params);
  });
}

function getMockStatus(jsonBody) {
  return typeof jsonBody === 'number' ? jsonBody : 200;
}

function getMockBody(jsonBody) {
  return typeof jsonBody === 'number' ? '' : jsonBody;
}

function buildHeader(name, jsonValue) {
  return new Header(name, new BytesValue('string', JSON.stringify(jsonValue)));
}
