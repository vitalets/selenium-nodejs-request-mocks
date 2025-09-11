import { BytesValue } from "selenium-webdriver/bidi/networkTypes.js";
import { Header } from "./fixed-header.js";
import { AddInterceptParameters } from "selenium-webdriver/bidi/addInterceptParameters.js";
import { ProvideResponseParameters } from "selenium-webdriver/bidi/provideResponseParameters.js";
// import { ContinueRequestParameters } from "selenium-webdriver/bidi/continueRequestParameters.js";
import { InterceptPhase } from "selenium-webdriver/bidi/interceptPhase.js";

export async function mockClientSideRequest(network, url, jsonBody) {
  await network.addIntercept(
    new AddInterceptParameters(InterceptPhase.BEFORE_REQUEST_SENT).urlStringPattern(url),
  );

  await network.beforeRequestSent(async (event) => {
    const request = event.request;
    const requestId = request.request;
    if (request.url.startsWith(url)) {
      const body = new BytesValue("string", JSON.stringify(jsonBody));
      const headers = [new Header("Access-Control-Allow-Origin", new BytesValue("string", "*"))];
      const response = new ProvideResponseParameters(requestId)
        .statusCode(200)
        .headers(headers)
        .body(body);
      await network.provideResponse(response);
    }
  });
}
