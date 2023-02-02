import Logger from "../../Logging/Logger";
import type { SuccessLog } from "../../Logging/Logs";
import DataRetrievingFailedError from "../../Errors/DataRetrievingFailed/DataRetrievingFailedError";
import DataSubmittingFailedError from "../../Errors/DataSubmittingFailed/DataSubmittingFailedError";

import getRandomInteger from "../../RandomValuesGenerators/getRandomInteger";
import secondsToMilliseconds from "../../DateTime/secondsToMilliseconds";
import stringifyAndFormatArbitraryValue from "../../Strings/stringifyAndFormatArbitraryValue";
import isNeitherUndefinedNorNull from "../../TypeGuards/Nullables/isNeitherUndefinedNorNull";

import MockGatewayHelperLocalization__English from "./MockGatewayHelperLocalization.english";


abstract class MockGatewayHelper {

  public static readonly localization: MockGatewayHelper.Localization = MockGatewayHelperLocalization__English;


  private static readonly MINIMAL_PENDING_PERIOD__SECONDS: number = 1;
  private static readonly MAXIMAL_PENDING_PERIOD__SECONDS: number = 2;


  public static async simulateDataRetrieving<RequestParameters, ResponseData>(
    dataRetrievingSimulationConfiguration: MockGatewayHelper.
        DataRetrievingSimulationConfiguration<RequestParameters, ResponseData>
  ): Promise<ResponseData> {

    const {
      requestParameters,
      getResponseData,
      minimalPendingPeriod__seconds = MockGatewayHelper.MINIMAL_PENDING_PERIOD__SECONDS,
      maximalPendingPeriod__seconds = MockGatewayHelper.MAXIMAL_PENDING_PERIOD__SECONDS,
      mustSimulateError = false,
      mustLogResponseData = false,
      gatewayName,
      transactionName
    }: MockGatewayHelper.DataRetrievingSimulationConfiguration<
      RequestParameters, ResponseData
    > = dataRetrievingSimulationConfiguration;

    return new Promise<ResponseData>(
      (resolve: (responseData: ResponseData) => void, reject: (error: Error) => void): void => {

        setTimeout(

          (): void => {

            if (mustSimulateError) {

              reject(new DataRetrievingFailedError({
                customMessage: MockGatewayHelper.localization.generateErrorSimulationCompletedLog({
                  transactionName, gatewayName
                })
              }));

              return;

            }


            const responseData: ResponseData = getResponseData();

            Logger.logSuccess(
              MockGatewayHelper.localization.generateDataRetrievingSimulationCompletedLog({
                gatewayName,
                transactionName,
                ...isNeitherUndefinedNorNull(requestParameters) ?
                  { formattedRequestParameters: stringifyAndFormatArbitraryValue(requestParameters) } : null,
                ...mustLogResponseData && isNeitherUndefinedNorNull(responseData) ?
                    { formattedResponseData: stringifyAndFormatArbitraryValue(responseData) } : null
              })
            );

            resolve(responseData);

          },

          secondsToMilliseconds(
            getRandomInteger({
              minimalValue: minimalPendingPeriod__seconds,
              maximalValue: maximalPendingPeriod__seconds
            })
          )

        );
      }
    );

  }

  public static async simulateDataSubmitting<RequestData, ResponseData>(
    dataSubmittingSimulationConfiguration: MockGatewayHelper.
        DataSubmittingSimulationConfiguration<RequestData, ResponseData>
  ): Promise<ResponseData> {

    const {
      requestData,
      getResponseData,
      minimalPendingPeriod__seconds = MockGatewayHelper.MINIMAL_PENDING_PERIOD__SECONDS,
      maximalPendingPeriod__seconds = MockGatewayHelper.MAXIMAL_PENDING_PERIOD__SECONDS,
      mustSimulateError = false,
      mustLogResponseData = false,
      gatewayName,
      transactionName
    }: MockGatewayHelper.DataSubmittingSimulationConfiguration<
      RequestData, ResponseData
    > = dataSubmittingSimulationConfiguration;

    return new Promise<ResponseData>(
      (resolve: (responseData: ResponseData) => void, reject: (error: Error) => void): void => {

        setTimeout(

          (): void => {

            if (mustSimulateError) {

              reject(new DataSubmittingFailedError({
                customMessage: MockGatewayHelper.localization.generateErrorSimulationCompletedLog({
                  transactionName, gatewayName
                })
              }));

              return;

            }


            const responseData: ResponseData = getResponseData();

            Logger.logSuccess(
              MockGatewayHelper.localization.generateDataSubmittingSimulationCompletedLog({
                gatewayName,
                transactionName,
                ...isNeitherUndefinedNorNull(requestData) ?
                  { formattedRequestData: stringifyAndFormatArbitraryValue(requestData) } : null,
                ...mustLogResponseData && isNeitherUndefinedNorNull(responseData) ?
                    { formattedResponseData: stringifyAndFormatArbitraryValue(responseData) } : null
              })
            );

            resolve(responseData);

          },

          secondsToMilliseconds(
            getRandomInteger({
              minimalValue: minimalPendingPeriod__seconds,
              maximalValue: maximalPendingPeriod__seconds
            })
          )

        );

      }
    );

  }

}


namespace MockGatewayHelper {

  export type DataRetrievingSimulationConfiguration<RequestParameters, ResponseData> =
      Readonly<{
        requestParameters: RequestParameters;
        getResponseData: () => ResponseData;
      }> &
      SimulationOptions;

  export type DataSubmittingSimulationConfiguration<RequestData, ResponseData> =
      Readonly<{
        requestData: RequestData;
        getResponseData: () => ResponseData;
      }> &
      SimulationOptions;


  export type SimulationOptions = Readonly<{
    minimalPendingPeriod__seconds?: number;
    maximalPendingPeriod__seconds?: number;
    mustSimulateError?: boolean;
    mustLogResponseData?: boolean;
    gatewayName: string;
    transactionName: string;
  }>;


  export type Localization = Readonly<{

    generateErrorSimulationCompletedLog: (
      compoundParameter: Localization.ErrorSimulationCompletedLog.CompoundParameter
    ) => string;

    generateDataRetrievingSimulationCompletedLog: (
      compoundParameter: Localization.DataRetrievingSimulationCompletedLog.CompoundParameter
    ) => Localization.DataRetrievingSimulationCompletedLog;

    generateDataSubmittingSimulationCompletedLog: (
        compoundParameter: Localization.DataSubmittingSimulationCompletedLog.CompoundParameter
    ) => Localization.DataSubmittingSimulationCompletedLog;

  }>;

  export namespace Localization {

    export namespace ErrorSimulationCompletedLog {

      export type CompoundParameter = Readonly<{
        gatewayName: string;
        transactionName: string;
      }>;

    }


    export type DataRetrievingSimulationCompletedLog = Pick<SuccessLog, "title" | "description">;

    export namespace DataRetrievingSimulationCompletedLog {

      export type CompoundParameter = Readonly<{
        gatewayName: string;
        transactionName: string;
        formattedRequestParameters?: string;
        formattedResponseData?: string;
      }>;

    }


    export type DataSubmittingSimulationCompletedLog = Pick<SuccessLog, "title" | "description">;

    export namespace DataSubmittingSimulationCompletedLog {

      export type CompoundParameter = Readonly<{
        gatewayName: string;
        transactionName: string;
        formattedRequestData?: string;
        formattedResponseData?: string;
      }>;

    }

  }

}


export default MockGatewayHelper;
