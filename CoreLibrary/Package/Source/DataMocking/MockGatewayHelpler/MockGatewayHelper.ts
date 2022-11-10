import Logger from "../../Logging/Logger";
import DataRetrievingFailedError from "../../Errors/DataRetrievingFailed/DataRetrievingFailedError";
import DataSubmittingFailedError from "../../Errors/DataSubmittingFailed/DataSubmittingFailedError";

import getRandomInteger from "../../RandomValuesGenerators/getRandomInteger";
import secondsToMilliseconds from "../../DateTime/secondsToMilliseconds";
import stringifyAndFormatArbitraryValue from "../../Strings/stringifyAndFormatArbitraryValue";
import insertSubstringIf from "../../Strings/insertSubstringIf";


abstract class MockGatewayHelper {

  private static readonly MINIMAL_PENDING_PERIOD__SECONDS: number = 1;
  private static readonly MAXIMAL_PENDING_PERIOD__SECONDS: number = 2;


  public static async simulateDataRetrieving<RequestParameters, ResponseData>(
    requestParameters: RequestParameters,
    getResponseData: () => ResponseData,
    {
      minimalPendingPeriod__seconds = MockGatewayHelper.MINIMAL_PENDING_PERIOD__SECONDS,
      maximalPendingPeriod__seconds = MockGatewayHelper.MAXIMAL_PENDING_PERIOD__SECONDS,
      mustSimulateError = false,
      mustLogResponseData = false,
      gatewayName,
      transactionName
    }: MockGatewayHelper.SimulationOptions
  ): Promise<ResponseData> {

    return new Promise<ResponseData>(
      (resolve: (responseData: ResponseData) => void, reject: (error: Error) => void): void => {

        setTimeout(

          (): void => {

            if (mustSimulateError) {
              reject(new DataRetrievingFailedError({
                customMessage: "'MockGatewayHelper.simulateDataRetrieving()', the error has been simulated for the transaction " +
                    `'${ gatewayName }.${ transactionName }' because option 'mustSimulateError' has been set to true. `
              }));
              return;
            }


            const responseData: ResponseData = getResponseData();

            Logger.logSuccess({
              title: "MockGatewayHelper, reproduction of the data retrieving complete",
              description: "The 'MockGatewayHelper' finished the reproduction of the data retrieving for the transaction " +
                  `'${ gatewayName }.${ transactionName }' with request parameters:\n` +
                  `${ stringifyAndFormatArbitraryValue(requestParameters) }` +
                  `${ 
                    insertSubstringIf(
                      `\n Below data has been returned: \n${ stringifyAndFormatArbitraryValue(responseData) }`,
                      mustLogResponseData
                    )
                  }`
            });

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
    requestData: RequestData,
    getResponseData: () => ResponseData,
    {
      minimalPendingPeriod__seconds = MockGatewayHelper.MINIMAL_PENDING_PERIOD__SECONDS,
      maximalPendingPeriod__seconds = MockGatewayHelper.MAXIMAL_PENDING_PERIOD__SECONDS,
      mustSimulateError = false,
      mustLogResponseData = false,
      gatewayName,
      transactionName
    }: MockGatewayHelper.SimulationOptions
  ): Promise<ResponseData> {

    return new Promise<ResponseData>(
      (resolve: (responseData: ResponseData) => void, reject: (error: Error) => void): void => {

        setTimeout(

          (): void => {

            if (mustSimulateError) {
              reject(new DataSubmittingFailedError({
                customMessage: "'MockGatewayHelper.simulateDataSubmitting()', the error has been simulated for the transaction " +
                    `'${ gatewayName }.${ transactionName }' because option 'mustSimulateError' has been set to true. `
              }));
              return;
            }


            const responseData: ResponseData = getResponseData();

            Logger.logSuccess({
              title: "MockGatewayHelper, reproduction of the data submitting complete",
              description: "The 'MockGatewayHelper' finished the reproduction of the data submitting for the transaction " +
                  `'${ gatewayName }.${ transactionName }' with request data:\n` +
                  `${ stringifyAndFormatArbitraryValue(requestData) }` +
                  `${
                    insertSubstringIf(
                      `\n Below data has been returned: \n${ stringifyAndFormatArbitraryValue(responseData) }`,
                      mustLogResponseData
                    )
                  }`
            });

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

  export type SimulationOptions = Readonly<{
    minimalPendingPeriod__seconds?: number;
    maximalPendingPeriod__seconds?: number;
    mustSimulateError?: boolean;
    mustLogResponseData?: boolean;
    gatewayName: string;
    transactionName: string;
  }>;

}


export default MockGatewayHelper;
