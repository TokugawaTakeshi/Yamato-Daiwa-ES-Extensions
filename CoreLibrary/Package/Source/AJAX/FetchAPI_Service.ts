/* eslint-disable id-denylist --
 * The "id-denylist" is not unsolicited for object properties, but the there is not API allowing to configure this rule
 *   selectively.
 * https://github.com/eslint/eslint/issues/15504 */

import AJAX_Service from "./AJAX_Service";
import Logger from "../Logging/Logger";
import DataRetrievingFailedError from "../Errors/DataRetrievingFailed/DataRetrievingFailedError";
import DataSubmittingFailedError from "../Errors/DataSubmittingFailed/DataSubmittingFailedError";
import UnsupportedScenarioError from "../Errors/UnsupportedScenario/UnsupportedScenarioError";
import type { PossiblyReadonlyParsedJSON } from "../Types/ParsedJSON";
import isPossiblyReadonlyParsedJSON from "../TypeGuards/ParsedJSON/isPossiblyReadonlyParsedJSON";
import HTTP_ResponseBodyParsingFailureError
  from "../Errors/HTTP/ResponseBodyParsingFailure/HTTP_ResponseBodyParsingFailureError";


export default class FetchAPI_Service extends AJAX_Service {

  /** @throws DataRetrievingFailedError */
  /** @throws HTTP_ResponseBodyParsingFailureError */
  /** @throws UnsupportedScenarioError */
  protected override async retrieveResponseWithRawData(
    compoundParameter: AJAX_Service.RawDataRetrieving.CompoundParameter
  ): Promise<AJAX_Service.ResponseWithRawData> {

    let response: Response;

    try {

      response = await fetch(
        compoundParameter.URI,
        {
          method: compoundParameter.HTTP_Method,
          headers: { ...compoundParameter.HTTP_Headers },
          ...compoundParameter.mustIncludeCookiesAndAuthenticationHeadersToRequest ? { credentials: "include" } : null
        }
      );

    } catch (error: unknown) {

      Logger.throwErrorAndLog({
        errorInstance: new DataRetrievingFailedError({
          customMessage: "The error has occurred before response has been retrieved."
        }),
        title: DataRetrievingFailedError.localization.defaultTitle,
        occurrenceLocation: "FetchAPI_Service.retrieveResponseWithRawData(compoundParameter)",
        innerError: error
      });

    }


    return {
      isSuccessful: response.ok,
      data: await FetchAPI_Service.extractRawDataFromResponse(response),
      HTTP_Headers: Array.from(response.headers).reduce(
        (HTTP_Headers: { [key: string]: string; }, [ key, value ]: [ string, string ]): AJAX_Service.HTTP_Headers => {
          HTTP_Headers[key] = value;
          return HTTP_Headers;
        },
        {}
      ),
      HTTP_Status: response.status
    };

  }

  /** @throws DataRetrievingFailedError */
  /** @throws HTTP_ResponseBodyParsingFailureError */
  /** @throws UnsupportedScenarioError */
  protected override async submitAndGetRawResponseDataIfAvailable(
    compoundParameter: AJAX_Service.GeneralizedDataSubmitting.CompoundParameter
  ): Promise<AJAX_Service.ResponseWithRawData> {

    let response: Response;

    try {

      response = await fetch(
        compoundParameter.URI,
        {
          method: compoundParameter.HTTP_Method,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            ...compoundParameter.HTTP_Headers
          },
          ...compoundParameter.mustIncludeCookiesAndAuthenticationHeadersToRequest ? { credentials: "include" } : null,
          body: JSON.stringify(compoundParameter.requestData)
        }
      );

    } catch (error: unknown) {

      Logger.throwErrorAndLog({
        errorInstance: new DataSubmittingFailedError({
          customMessage: "The error has occurred before server response has been retrieved."
        }),
        title: DataSubmittingFailedError.localization.defaultTitle,
        occurrenceLocation: "FetchAPI_Service.submitAndGetRawResponseDataIfAvailable(compoundParameter)",
        innerError: error
      });

    }


    return {
      isSuccessful: response.ok,
      data: compoundParameter.mustExpectResponseData || !response.ok ?
          await FetchAPI_Service.extractRawDataFromResponse(response) :
          {},
      HTTP_Headers: Array.from(response.headers).reduce(
        (HTTP_Headers: { [key: string]: string; }, [ key, value ]: [ string, string ]): AJAX_Service.HTTP_Headers => {
          HTTP_Headers[key] = value;
          return HTTP_Headers;
        },
        {}
      ),
      HTTP_Status: response.status
    };

  }


  /** @throws HTTP_ResponseBodyParsingFailureError */
  protected static async extractRawDataFromResponse(response: Response): Promise<PossiblyReadonlyParsedJSON> {

    let responseRawData: unknown;

    try {
      responseRawData = await response.json();
    } catch (error: unknown) {
      Logger.throwErrorAndLog({
        errorInstance: new HTTP_ResponseBodyParsingFailureError(
          "The HTTP response body could not be represented as JSON."
        ),
        title: HTTP_ResponseBodyParsingFailureError.localization.defaultTitle,
        occurrenceLocation: "FetchAPI_Service.decodeJSON_Data(compoundParameter)",
        innerError: error
      });
    }

    if (!isPossiblyReadonlyParsedJSON(responseRawData)) {
      Logger.throwErrorAndLog({
        errorInstance: new UnsupportedScenarioError(
          `The data has type "${ typeof responseRawData }" while currently non-object data in not supported.`
        ),
        title: UnsupportedScenarioError.localization.defaultTitle,
        occurrenceLocation: "FetchAPI_Service.decodeJSON_Data(compoundParameter)"
      });
    }


    return responseRawData;

  }

}
