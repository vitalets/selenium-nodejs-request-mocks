import { Header, BytesValue } from 'selenium-webdriver/bidi/networkTypes.js';
import { AddInterceptParameters } from 'selenium-webdriver/bidi/addInterceptParameters.js';
import { ProvideResponseParameters } from 'selenium-webdriver/bidi/provideResponseParameters.js';
import { InterceptPhase } from 'selenium-webdriver/bidi/interceptPhase.js';

/**
 * Mocks a client-side request by intercepting network traffic and providing a custom response.
 *
 * @param {object} network - The network object used to manage intercepts and requests.
 * @param {string} requestUrl - The URL of the request to mock.
 * @param {object} jsonBody - The JSON body to use as the mocked response.
 */
export async function mockClientSideRequest(network, requestUrl, jsonBody) {
  await network.addIntercept(
    new AddInterceptParameters(InterceptPhase.BEFORE_REQUEST_SENT).urlStringPattern(requestUrl),
  );

  await network.beforeRequestSent(async (event) => {
    const request = event.request;
    const requestId = request.request;
    if (request.url.startsWith(requestUrl)) {
      const body = new BytesValue('string', JSON.stringify(jsonBody));
      const headers = [new Header('Access-Control-Allow-Origin', new BytesValue('string', '*'))];
      const response = new ProvideResponseParameters(requestId)
        .statusCode(200)
        .headers(headers)
        .body(body);
      await network.provideResponse(response);
    }
  });
}
