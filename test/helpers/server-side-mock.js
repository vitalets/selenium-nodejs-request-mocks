import { Header, BytesValue } from 'selenium-webdriver/bidi/networkTypes.js';
import { AddInterceptParameters } from 'selenium-webdriver/bidi/addInterceptParameters.js';
import { ContinueRequestParameters } from 'selenium-webdriver/bidi/continueRequestParameters.js';
import { InterceptPhase } from 'selenium-webdriver/bidi/interceptPhase.js';

/**
 * A helper to mock server-side requests.
 */
export async function mockServerSideRequest(network, pageUrl, requestUrl, jsonBody) {
  await network.addIntercept(
    new AddInterceptParameters(InterceptPhase.BEFORE_REQUEST_SENT).urlStringPattern(
      pageUrl,
    ),
  );

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
