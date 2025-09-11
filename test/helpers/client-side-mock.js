import { BytesValue } from "selenium-webdriver/bidi/networkTypes.js";
import { Header } from "./fixed-header.js";
import { AddInterceptParameters } from "selenium-webdriver/bidi/addInterceptParameters.js";
import { ProvideResponseParameters } from "selenium-webdriver/bidi/provideResponseParameters.js";
import { InterceptPhase } from "selenium-webdriver/bidi/interceptPhase.js";

export async function mockClientSideRequest(network, requestUrl, jsonBody) {
  await network.addIntercept(
    new AddInterceptParameters(InterceptPhase.BEFORE_REQUEST_SENT).urlStringPattern(requestUrl),
  );

  await network.beforeRequestSent(async (event) => {
    const request = event.request;
    const requestId = request.request;
    if (request.url.startsWith(requestUrl)) {
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
