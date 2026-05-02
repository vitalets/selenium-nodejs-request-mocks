import { Header, BytesValue } from 'selenium-webdriver/bidi/networkTypes.js';
import { AddInterceptParameters } from 'selenium-webdriver/bidi/addInterceptParameters.js';
import { ProvideResponseParameters } from 'selenium-webdriver/bidi/provideResponseParameters.js';
import { InterceptPhase } from 'selenium-webdriver/bidi/interceptPhase.js';

/**
 * Mocks a client-side request by intercepting network traffic and providing a custom response.
 *
 * @param {object} network - The network object used to manage intercepts and requests.
 * @param {string} requestUrl - The URL of the request to mock.
 * @param {object|number} jsonBody - The JSON body to use as the mocked response or a status code for error simulation.
 */
export async function mockClientSideRequest(network, requestUrl, jsonBody) {
  // setup interception of the API request
  await network.addIntercept(
    new AddInterceptParameters(InterceptPhase.BEFORE_REQUEST_SENT).urlStringPattern(requestUrl),
  );

  // when request occurs, provide mocked response
  await network.beforeRequestSent(async (event) => {
    const request = event.request;
    const requestId = request.request;
    if (request.url === requestUrl) {
      const status = getMockStatus(jsonBody);
      const headers = getMockHeaders();
      const body = getMockBody(jsonBody);

      const response = new ProvideResponseParameters(requestId)
        .statusCode(status)
        .headers(headers)
        .body(body);

      await network.provideResponse(response);
    }
  });
}

function getMockStatus(jsonBody) {
  return typeof jsonBody === 'number' ? jsonBody : 200;
}

function getMockHeaders() {
  return [new Header('Access-Control-Allow-Origin', new BytesValue('string', '*'))];
}

function getMockBody(jsonBody) {
  return typeof jsonBody === 'object'
    ? new BytesValue('string', JSON.stringify(jsonBody))
    : new BytesValue('string', '');
}
