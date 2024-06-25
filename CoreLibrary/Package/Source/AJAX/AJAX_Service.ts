/* eslint-disable id-denylist --
 * The "id-denylist" is not unsolicited for object properties, but the there is not API allowing to configure this rule
 *   selectively.
 * https://github.com/eslint/eslint/issues/15504 */

import type { PossiblyReadonlyParsedJSON, ReadonlyParsedJSON, ReadonlyParsedJSON_Object } from "../Types/ParsedJSON";
import HTTP_Methods from "../ConstantsAndEnumerations/HTTP/HTTP_Methods";

import RawObjectDataProcessor from "../RawObjectDataProcessor/RawObjectDataProcessor";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";
import DataSubmittingFailedError from "../Errors/DataSubmittingFailed/DataSubmittingFailedError";
import DataRetrievingFailedError from "../Errors/DataRetrievingFailed/DataRetrievingFailedError";
import InvalidExternalDataError from "../Errors/InvalidExternalData/InvalidExternalDataError";
import InvalidConfigError from "../Errors/InvalidConfig/InvalidConfigError";

import removeSpecificCharacterFromCertainPosition from "../Strings/removeSpecificCharacterFromCertainPosition";
import insertSubstring from "../Strings/insertSubstring";
import type URI_QueryParametersSerializer from "./URI_QueryParametersSerializer";
import serializeURI_QueryParameters from "./serializeURI_QueryParameters";

import isNonEmptyString from "../TypeGuards/Strings/isNonEmptyString";
import isNull from "../TypeGuards/Nullables/isNull";
import isUndefined from "../TypeGuards/Nullables/isUndefined";
import isNotUndefined from "../TypeGuards/Nullables/isNotUndefined";


abstract class AJAX_Service {

  public static implementation: AJAX_Service | null = null;

  protected static API_SERVER_URI_CONSTANT_PART__WITHOUT_TRAILING_SLASH: string | null = null;
  protected static URI_QueryParametersSerializer: URI_QueryParametersSerializer = serializeURI_QueryParameters;

  public static set API_SERVER_URI_CONSTANT_PART(value: string) {
    AJAX_Service.API_SERVER_URI_CONSTANT_PART__WITHOUT_TRAILING_SLASH = removeSpecificCharacterFromCertainPosition({
      targetString: value,
      targetCharacter: "/",
      fromLastPosition: true
    });
  }

  public static setup(
    properties: Readonly<{
      implementation?: AJAX_Service;
      API_ServerURI_ConstantPart?: string;
      URI_QueryParametersSerializer?: URI_QueryParametersSerializer;
    }>
  ): void {

    if (isNotUndefined(properties.implementation)) {
      AJAX_Service.implementation = properties.implementation;
    }

    if (isNotUndefined(properties.API_ServerURI_ConstantPart)) {
      AJAX_Service.API_SERVER_URI_CONSTANT_PART = properties.API_ServerURI_ConstantPart;
    }

    if (isNotUndefined(properties.URI_QueryParametersSerializer)) {
      AJAX_Service.URI_QueryParametersSerializer = properties.URI_QueryParametersSerializer;
    }

  }


  /* ━━━ Facade methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static async retrieveData<RawValidResponseData extends PossiblyReadonlyParsedJSON>(
    compoundParameter: AJAX_Service.DataRetrieving.CompoundParameter
  ): Promise<AJAX_Service.Response<RawValidResponseData>> {
    return AJAX_Service.getExpectedToBeInitializedImplementation().retrieveData(compoundParameter);
  }


  public static async submitData<RawValidResponseData extends PossiblyReadonlyParsedJSON>(
    compoundParameter: AJAX_Service.DataSubmitting.WithExpectedResponseData.CompoundParameter
  ): Promise<AJAX_Service.Response<RawValidResponseData>>;

  public static async submitData(
    compoundParameter: AJAX_Service.DataSubmitting.WithoutExpectedResponseData.CompoundParameter
  ): Promise<AJAX_Service.Response>;

  public static async submitData<RawValidResponseData extends PossiblyReadonlyParsedJSON>(
    compoundParameter: AJAX_Service.DataSubmitting.WithExpectedResponseData.CompoundParameter
  ): Promise<AJAX_Service.Response<RawValidResponseData>> {
    return AJAX_Service.getExpectedToBeInitializedImplementation().submitData(compoundParameter);
  }


  /* ━━━ Protected abstract methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  protected abstract retrieveResponseWithRawData(
    compoundParameter: AJAX_Service.RawDataRetrieving.CompoundParameter
  ): Promise<AJAX_Service.ResponseWithRawData>;

  protected abstract submitAndGetRawResponseDataIfAvailable(
    compoundParameter: AJAX_Service.GeneralizedDataSubmitting.CompoundParameter
  ): Promise<AJAX_Service.ResponseWithRawData>;


  /* ━━━ Public instance methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Data retrieving ──────────────────────────────────────────────────────────────────────────────────────────── */
  /** @throws InvalidConfigError */
  /** @throws DataRetrievingFailedError */
  /** @throws HTTP_ResponseBodyParsingFailureError */
  /** @throws InvalidExternalDataError */
  public async retrieveData<RawValidResponseData extends PossiblyReadonlyParsedJSON>(
    compoundParameter: AJAX_Service.DataRetrieving.CompoundParameter
  ): Promise<AJAX_Service.Response<RawValidResponseData>> {

    let responseWithRawData: AJAX_Service.ResponseWithRawData;

    try {

      responseWithRawData = await this.retrieveResponseWithRawData({
        URI: this.normalizeURI(compoundParameter),
        HTTP_Method: compoundParameter.HTTP_Method ?? HTTP_Methods.get,
        HTTP_Headers: compoundParameter.HTTP_Headers ?? {},
        mustIncludeCookiesAndAuthenticationHeadersToRequest:
            compoundParameter.mustIncludeCookiesAndAuthenticationHeadersToRequest === true
      });

    } catch (error: unknown) {

      Logger.throwErrorAndLog({
        errorInstance: new DataRetrievingFailedError({
          customMessage: "The retrieving data by AJAX has failed."
        }),
        title: DataRetrievingFailedError.localization.defaultTitle,
        occurrenceLocation: "AJAX_Service.retrieveData(compoundParameter)",
        innerError: error
      });

    }


    if (responseWithRawData.isSuccessful) {

      const responseRawDataProcessingResult: RawObjectDataProcessor.ProcessingResult<RawValidResponseData> =
          RawObjectDataProcessor.process(responseWithRawData.data, compoundParameter.validResponseDataSpecification);

      if (responseRawDataProcessingResult.rawDataIsInvalid) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidExternalDataError({
            mentionToExpectedData: "HTTP_ResponseData",
            messageSpecificPart: RawObjectDataProcessor.formatValidationErrorsList(
                responseRawDataProcessingResult.validationErrorsMessages
            )
          }),
          title: InvalidExternalDataError.localization.defaultTitle,
          occurrenceLocation: "AJAX_Service.retrieveData(compoundParameter)"
        });
      }

      return {
        isSuccessful: true,
        data: responseRawDataProcessingResult.processedData,
        HTTP_Headers: responseWithRawData.HTTP_Headers,
        HTTP_Status: responseWithRawData.HTTP_Status
      };

    }


    return {
      isSuccessful: false,
      data: responseWithRawData.data,
      HTTP_Headers: responseWithRawData.HTTP_Headers,
      HTTP_Status: responseWithRawData.HTTP_Status
    };

  }


  /* ─── Data submitting ──────────────────────────────────────────────────────────────────────────────────────────── */
  public async submitData<RawValidResponseData extends PossiblyReadonlyParsedJSON>(
    compoundParameter: AJAX_Service.DataSubmitting.WithExpectedResponseData.CompoundParameter
  ): Promise<AJAX_Service.Response<RawValidResponseData>>;

  public async submitData(
    compoundParameter: AJAX_Service.DataSubmitting.WithoutExpectedResponseData.CompoundParameter
  ): Promise<AJAX_Service.Response>;

  /** @throws InvalidConfigError */
  /** @throws DataSubmittingFailedError */
  /** @throws HTTP_ResponseBodyParsingFailureError */
  /** @throws InvalidExternalDataError */
  public async submitData<RawValidResponseData extends PossiblyReadonlyParsedJSON>(
    compoundParameter: AJAX_Service.DataSubmitting.WithExpectedResponseData.CompoundParameter
    /* eslint-disable-next-line @typescript-eslint/no-invalid-void-type --
    * Depending on the overload, the promise payload could be or not to be. */
  ): Promise<AJAX_Service.Response<RawValidResponseData>> {

    let responseWithRawData: AJAX_Service.ResponseWithRawData;

    try {

      responseWithRawData = await this.submitAndGetRawResponseDataIfAvailable({
        URI: this.normalizeURI(compoundParameter),
        HTTP_Method: compoundParameter.HTTP_Method ?? HTTP_Methods.get,
        HTTP_Headers: compoundParameter.HTTP_Headers ?? {},
        requestData: compoundParameter.requestData,
        mustExpectResponseData: isNotUndefined(compoundParameter.validResponseDataSpecification),
        mustIncludeCookiesAndAuthenticationHeadersToRequest:
            compoundParameter.mustIncludeCookiesAndAuthenticationHeadersToRequest === true
      });

    } catch (error: unknown) {

      Logger.throwErrorAndLog({
        errorInstance: new DataSubmittingFailedError({
          customMessage: "The submitting of the data by AJAX has failed."
        }),
        title: DataSubmittingFailedError.localization.defaultTitle,
        occurrenceLocation: "AJAX_Service.submitData(compoundParameter)",
        innerError: error
      });

    }


    if (isUndefined(compoundParameter.validResponseDataSpecification)) {
      return responseWithRawData.isSuccessful ?
          {
            isSuccessful: true,
            /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
            * TypeScript could not detect that when `compoundParameter.validResponseDataSpecification` is undefined,
            *   the `RawValidResponseData` is `PossiblyReadonlyParsedJSON` without additional constraints. */
            data: responseWithRawData.data as RawValidResponseData,
            HTTP_Headers: responseWithRawData.HTTP_Headers,
            HTTP_Status: responseWithRawData.HTTP_Status
          } :
          {
            isSuccessful: false,
            data: responseWithRawData.data,
            HTTP_Headers: responseWithRawData.HTTP_Headers,
            HTTP_Status: responseWithRawData.HTTP_Status
          };
    }


    if (responseWithRawData.isSuccessful) {

      const responseRawDataProcessingResult: RawObjectDataProcessor.ProcessingResult<RawValidResponseData> =
          RawObjectDataProcessor.process(responseWithRawData.data, compoundParameter.validResponseDataSpecification);

      if (responseRawDataProcessingResult.rawDataIsInvalid) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidExternalDataError({
            mentionToExpectedData: "HTTP_ResponseData",
            messageSpecificPart: RawObjectDataProcessor.formatValidationErrorsList(
                responseRawDataProcessingResult.validationErrorsMessages
            )
          }),
          title: InvalidExternalDataError.localization.defaultTitle,
          occurrenceLocation: "AJAX_Service.retrieveData(compoundParameter)"
        });
      }

      return {
        isSuccessful: true,
        data: responseRawDataProcessingResult.processedData,
        HTTP_Headers: responseWithRawData.HTTP_Headers,
        HTTP_Status: responseWithRawData.HTTP_Status
      };

    }


    return {
      isSuccessful: false,
      data: responseWithRawData.data,
      HTTP_Headers: responseWithRawData.HTTP_Headers,
      HTTP_Status: responseWithRawData.HTTP_Status
    };

  }


  /* ━━━ Routines ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /** @throws InvalidConfigError */
  protected normalizeURI(
    compoundParameter: AJAX_Service.URI_PathRawDefinition & AJAX_Service.URI_QueryParametersDefinition
  ): string {

    const targetURI_PartUntilPath: string = this.normalizeURI_UntilPath(compoundParameter);

    const URI_QueryParameters: Readonly<ReadonlyParsedJSON_Object> = compoundParameter.URI_QueryParameters ?? {};
    let serializedQueryParameters: string | undefined;

    if (Object.entries(URI_QueryParameters).length > 0) {
      serializedQueryParameters =
          compoundParameter.URI_QueryParametersSerializer?.(URI_QueryParameters) ??
          AJAX_Service.URI_QueryParametersSerializer(URI_QueryParameters);
    }

    return targetURI_PartUntilPath +
        insertSubstring(
          serializedQueryParameters,
          { modifier: (nonEmptySerializedQueryParameters: string): string => `?${ nonEmptySerializedQueryParameters }` }
        );

  }

  /** @throws InvalidConfigError */
  /* eslint-disable-next-line @typescript-eslint/class-methods-use-this --
  * This method do not need `this` but good to be here from the viewpoint of logic sequence. */
  protected normalizeURI_UntilPath(URI_PathRawDefinition: AJAX_Service.URI_PathRawDefinition): string {

    if (isNonEmptyString(URI_PathRawDefinition.alternatingURI_PathPart)) {

      if (isNull(AJAX_Service.API_SERVER_URI_CONSTANT_PART__WITHOUT_TRAILING_SLASH)) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidConfigError({
            customMessage:
                "The \"alternatingURI_PathPart\" has been specified while the the static field " +
                  "\"API_SERVER_URI_CONSTANT_PART\" has not been set."
          }),
          title: InvalidConfigError.localization.defaultTitle,
          occurrenceLocation: "AJAX_Service.normalizeURI_UntilPath(URI_PathRawDefinition)"
        });
      }


      return encodeURI(
        `${ AJAX_Service.API_SERVER_URI_CONSTANT_PART__WITHOUT_TRAILING_SLASH }/` +
        removeSpecificCharacterFromCertainPosition({
          targetString: URI_PathRawDefinition.alternatingURI_PathPart,
          targetCharacter: "/",
          fromFirstPosition: true
        })
      );

    }


    if (isNonEmptyString(URI_PathRawDefinition.specificURI_UntilPath)) {
      return encodeURI(URI_PathRawDefinition.specificURI_UntilPath);
    }


    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        customMessage:
            "Either \"alternatingURI_PathPart\" or \"specificURI_UntilPath\" must be specified with non-empty " +
              "strings while neither has been."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "AJAX_Service.normalizeURI_UntilPath(URI_PathRawDefinition)"
    });

  }

  protected static getExpectedToBeInitializedImplementation(): AJAX_Service {

    if (isNull(AJAX_Service.implementation)) {
      Logger.throwErrorAndLog({
        errorType: "ImplementationHasNotBeenSetError",
        title: "Implementation has not been set",
        description:
            "To use the static methods of \"AJAX_Service\" class and its inheritors, it is required to set " +
              "the \"implementation\" public static field first or use \"setup\" static method.",
        occurrenceLocation: "AJAX_Service.getExpectedToBeInitializedImplementation()"
      });
    }


    return AJAX_Service.implementation;

  }

}


namespace AJAX_Service {

  export type URI_PathRawDefinition = Readonly<
    {
      alternatingURI_PathPart: string;
      specificURI_UntilPath?: undefined;
    } |
    {
      specificURI_UntilPath: string;
      alternatingURI_PathPart?: undefined;
    }
  >;

  export type URI_QueryParametersDefinition = Readonly<{
    URI_QueryParameters?: Readonly<ReadonlyParsedJSON_Object>;
    URI_QueryParametersSerializer?: URI_QueryParametersSerializer;
  }>;

  export type HTTP_Headers = Readonly<{ [headerName: string]: string; }>;


  export type ResponseWithRawData = Readonly<{
    isSuccessful: boolean;
    data: PossiblyReadonlyParsedJSON;
    HTTP_Status: number;
    HTTP_Headers: HTTP_Headers;
  }>;

  export type Response<ResponseData extends PossiblyReadonlyParsedJSON = PossiblyReadonlyParsedJSON> =
    Readonly<
      (
        {
          isSuccessful: true;
          data: ResponseData;
        } |
        {
          isSuccessful: false;
          data: PossiblyReadonlyParsedJSON;
        }
      ) &
      {
        HTTP_Status: number;
        HTTP_Headers: HTTP_Headers;
      }
    >;

  export namespace DataRetrieving {
    export type CompoundParameter =
        URI_PathRawDefinition &
        URI_QueryParametersDefinition &
        Readonly<
          {
            HTTP_Method?: HTTP_Methods;
            HTTP_Headers?: HTTP_Headers;
            validResponseDataSpecification: Readonly<RawObjectDataProcessor.ObjectDataSpecification>;
            mustIncludeCookiesAndAuthenticationHeadersToRequest?: boolean;
          }
        >;
  }

  export namespace DataSubmitting {

    export namespace WithExpectedResponseData {

      export type CompoundParameter =
          URI_PathRawDefinition &
          URI_QueryParametersDefinition &
          {
            HTTP_Method?: HTTP_Methods;
            HTTP_Headers?: HTTP_Headers;
            requestData: Readonly<ReadonlyParsedJSON_Object>;
            validResponseDataSpecification: RawObjectDataProcessor.ObjectDataSpecification;
            mustIncludeCookiesAndAuthenticationHeadersToRequest?: boolean;
          };

    }

    export namespace WithoutExpectedResponseData {

      export type CompoundParameter =
          URI_PathRawDefinition &
          URI_QueryParametersDefinition &
          {
            HTTP_Method?: HTTP_Methods;
            HTTP_Headers?: HTTP_Headers;
            requestData: Readonly<ReadonlyParsedJSON_Object>;
            mustIncludeCookiesAndAuthenticationHeadersToRequest?: boolean;
          };

    }

  }

  export namespace RawDataRetrieving {

    export type CompoundParameter = Readonly<{
      URI: string;
      HTTP_Headers: HTTP_Headers;
      HTTP_Method: HTTP_Methods;
      mustIncludeCookiesAndAuthenticationHeadersToRequest: boolean;
    }>;

  }

  export namespace GeneralizedDataSubmitting {

    export type CompoundParameter = Readonly<{
      URI: string;
      HTTP_Headers: HTTP_Headers;
      HTTP_Method: HTTP_Methods;
      requestData: ReadonlyParsedJSON;
      mustExpectResponseData: boolean;
      mustIncludeCookiesAndAuthenticationHeadersToRequest: boolean;
    }>;

  }

}


export default AJAX_Service;
