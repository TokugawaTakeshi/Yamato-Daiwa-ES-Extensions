import AJAX_Service from "./AJAX_Service";
import Logger from "../Logging/Logger";
import DataRetrievingFailedError from "../Errors/DataRetrievingFailed/DataRetrievingFailedError";
import DataSubmittingFailedError from "../Errors/DataSubmittingFailed/DataSubmittingFailedError";


export default class FetchAPI_Service extends AJAX_Service {

  protected async retrieveRawData(
    compoundParameter: AJAX_Service.RawDataRetrieving.CompoundParameter
  ): Promise<unknown> {

    let response: Response;

    try {

      response = await fetch(compoundParameter.URI, {
        method: compoundParameter.HTTP_Method,
        headers: { ...compoundParameter.HTTP_Headers }
      });

    } catch (error: unknown) {

      Logger.throwErrorAndLog({
        errorInstance: new DataRetrievingFailedError({
          customMessage: "The error has occurred before server response has been retrieved."
        }),
        title: DataRetrievingFailedError.localization.defaultTitle,
        occurrenceLocation: "FetchAPI_Service.retrieveRawData(namedParameters)",
        innerError: error
      });

    }


    return FetchAPI_Service.decodeJSON_Data(response);

  }

  protected async submitAndGetRawResponseDataIfAvailable(
    compoundParameter: AJAX_Service.GeneralizedDataSubmitting.CompoundParameter
  ): Promise<unknown> {

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
          body: JSON.stringify(compoundParameter.requestData)
        }
      );

    } catch (error: unknown) {

      Logger.throwErrorAndLog({
        errorInstance: new DataSubmittingFailedError({
          customMessage: "The error has occurred before server response has been retrieved."
        }),
        title: DataSubmittingFailedError.localization.defaultTitle,
        occurrenceLocation: "FetchAPI_Service.retrieveRawData(namedParameters)",
        innerError: error
      });

    }


    return FetchAPI_Service.decodeJSON_Data(response);

  }


  protected static async decodeJSON_Data(response: Response): Promise<unknown> {

    let responseRawData: unknown;

    try {
      responseRawData = await response.json();
    } catch (error: unknown) {
      Logger.throwErrorAndLog({
        errorInstance: new DataRetrievingFailedError({
          customMessage: "The error has occurred during the decoding of the response data."
        }),
        title: DataRetrievingFailedError.localization.defaultTitle,
        occurrenceLocation: "FetchAPI_Service.decodeJSON_Data(compoundParameter)",
        innerError: error
      });
    }

    return responseRawData;

  }

}
