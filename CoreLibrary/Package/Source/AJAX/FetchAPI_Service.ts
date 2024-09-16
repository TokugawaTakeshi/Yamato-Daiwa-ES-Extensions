import AJAX_Service from "./AJAX_Service";
import Logger from "../Logging/Logger";
import DataRetrievingFailedError from "../Errors/DataRetrievingFailed/DataRetrievingFailedError";
import DataSubmittingFailedError from "../Errors/DataSubmittingFailed/DataSubmittingFailedError";
import UnsupportedScenarioError from "../Errors/UnsupportedScenario/UnsupportedScenarioError";
import type { PossiblyReadonlyParsedJSON } from "../Types/ParsedJSON";
import isPossiblyReadonlyParsedJSON from "../TypeGuards/ParsedJSON/isPossiblyReadonlyParsedJSON";
import HTTP_ResponseBodyParsingFailureError from
    "../Errors/HTTP/ResponseBodyParsingFailure/HTTP_ResponseBodyParsingFailureError";
import isNotUndefined from "../TypeGuards/Nullables/isNotUndefined";


export default class FetchAPI_Service extends AJAX_Service {

  /** @throws DataRetrievingFailedError */
  /** @throws HTTP_ResponseBodyParsingFailureError */
  /** @throws UnsupportedScenarioError */
  protected override async retrieveResponseWithRawObjectData(
    compoundParameter: AJAX_Service.RawObjectDataRetrieving.CompoundParameter
  ): Promise<AJAX_Service.RawObjectDataResponse> {

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
      ...response.ok ?
          {
            isSuccessful: true,
            data: await FetchAPI_Service.extractRawObjectDataFromResponse(response)
          } :
          {
            isSuccessful: false,
            ...await FetchAPI_Service.extractErrorPayloadFromResponse(response)
          },
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
    compoundParameter: AJAX_Service.GeneralizedObjectDataSubmitting.CompoundParameter
  ): Promise<AJAX_Service.RawObjectDataResponse> {

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
          body: JSON.stringify(compoundParameter.requestData),
          ...compoundParameter.mustIncludeCookiesAndAuthenticationHeadersToRequest ? { credentials: "include" } : null
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
      ...response.ok ?
          {
            isSuccessful: true,
            data: compoundParameter.mustExpectResponseData ?
                await FetchAPI_Service.extractRawObjectDataFromResponse(response) : {}
          } :
          {
            isSuccessful: false,
            ...await FetchAPI_Service.extractErrorPayloadFromResponse(response)
          },
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

  protected override async retrieveResponseWithTextData(
    compoundParameter: AJAX_Service.TextDataRetrieving.NormalizedCompoundParameter
  ): Promise<AJAX_Service.TextDataResponse> {

    let response: Response;

    try {

      response = await fetch(
        compoundParameter.URI,
        {
          method: compoundParameter.HTTP_Method,
          headers: {
            ...isNotUndefined(compoundParameter.requestData) ? { "Content-Type": "application/json; charset=UTF-8" } : null,
            ...compoundParameter.HTTP_Headers
          },
          ...isNotUndefined(compoundParameter.requestData) ? { body: JSON.stringify(compoundParameter.requestData) } : null,
          ...compoundParameter.mustIncludeCookiesAndAuthenticationHeadersToRequest ? { credentials: "include" } : null
        }
      );

    } catch (error: unknown) {

      Logger.throwErrorAndLog({
        errorInstance: new DataRetrievingFailedError({
          customMessage: "The error has occurred before response has been retrieved."
        }),
        title: DataRetrievingFailedError.localization.defaultTitle,
        occurrenceLocation: "FetchAPI_Service.retrieveResponseWithTextData(compoundParameter)",
        innerError: error
      });

    }


    let decodedText: string | undefined;

    if (response.ok) {

      try {
        decodedText = await response.text();
      } catch (error: unknown) {
        Logger.throwErrorAndLog({
          errorInstance: new HTTP_ResponseBodyParsingFailureError(
              "The HTTP response body could not be represented as text."
          ),
          title: HTTP_ResponseBodyParsingFailureError.localization.defaultTitle,
          occurrenceLocation: "FetchAPI_Service.retrieveResponseWithTextData(compoundParameter)",
          innerError: error
        });
      }

    }

    return {
      ...isNotUndefined(decodedText) ?
        {
          isSuccessful: true,
          text: decodedText
        } : {
          isSuccessful: false,
          ...await FetchAPI_Service.extractErrorPayloadFromResponse(response)
        },
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
  protected static async extractRawObjectDataFromResponse(response: Response): Promise<PossiblyReadonlyParsedJSON> {

    let responseRawData: unknown;

    try {
      responseRawData = await response.json();
    } catch (error: unknown) {
      Logger.throwErrorAndLog({
        errorInstance: new HTTP_ResponseBodyParsingFailureError(
          "The HTTP response body could not be represented as JSON."
        ),
        title: HTTP_ResponseBodyParsingFailureError.localization.defaultTitle,
        occurrenceLocation: "FetchAPI_Service.extractRawObjectDataFromResponse(response)",
        innerError: error
      });
    }


    if (!isPossiblyReadonlyParsedJSON(responseRawData)) {
      Logger.throwErrorAndLog({
        errorInstance: new UnsupportedScenarioError(
          `The data has type "${ typeof responseRawData }" while currently non-object data in not supported.`
        ),
        title: UnsupportedScenarioError.localization.defaultTitle,
        occurrenceLocation: "FetchAPI_Service.extractRawObjectDataFromResponse(response)"
      });
    }


    return responseRawData;

  }

  /** @throws HTTP_ResponseBodyParsingFailureError */
  protected static async extractErrorPayloadFromResponse(response: Response): Promise<
    { errorObjectPayload: PossiblyReadonlyParsedJSON; } | { errorTextPayload: string; }
  > {

    const contentType: string | null = response.headers.get("content-type");

    if (contentType?.includes("application/json") === true) {

      let objectTypeData: unknown;

      try {
        objectTypeData = await response.json();
      } catch (error: unknown) {
        Logger.throwErrorAndLog({
          errorInstance: new HTTP_ResponseBodyParsingFailureError(
            "The HTTP response body could not be represented as JSON while \"content-type\" HTTP header is includes " +
              "\"application/json\"."
          ),
          title: HTTP_ResponseBodyParsingFailureError.localization.defaultTitle,
          occurrenceLocation: "FetchAPI_Service.extractErrorPayloadFromResponse(response)",
          innerError: error
        });
      }


      if (!isPossiblyReadonlyParsedJSON(objectTypeData)) {
        Logger.throwErrorAndLog({
          errorInstance: new UnsupportedScenarioError(
            `The data has type "${ typeof objectTypeData }" while currently non-object data in not supported.`
          ),
          title: UnsupportedScenarioError.localization.defaultTitle,
          occurrenceLocation: "FetchAPI_Service.extractRawObjectDataFromResponse(response)"
        });
      }


      return { errorObjectPayload: objectTypeData };

    }


    if (contentType?.includes("text") === true) {

      let decodedText: string;

      try {
        decodedText = await response.text();
      } catch (error: unknown) {
        Logger.throwErrorAndLog({
          errorInstance: new HTTP_ResponseBodyParsingFailureError(
            "The HTTP response body could not be represented as text while \"content-type\" HTTP header is includes " +
              "\"text\"."
          ),
          title: HTTP_ResponseBodyParsingFailureError.localization.defaultTitle,
          occurrenceLocation: "FetchAPI_Service.extractRawObjectDataFromResponse(compoundParameter)",
          innerError: error
        });
      }

      return { errorTextPayload: decodedText };

    }


    return { errorObjectPayload: {} };

  }

}
