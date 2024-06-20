import type MockGatewayHelper from "./MockGatewayHelper";
import isNonEmptyString from "../../TypeGuards/Strings/isNonEmptyString";


const MockGatewayHelperLocalization__English: MockGatewayHelper.Localization = {

  generateErrorSimulationCompletedLog: (
    {
      gatewayName,
      transactionName
    }: MockGatewayHelper.Localization.ErrorSimulationCompletedLog.CompoundParameter
  ): string =>
      `Class "MockGatewayHelper" has simulated the error for the transaction "${ gatewayName }.${ transactionName }" ` +
      "because the option \"mustSimulateError\" has been set to true.",

  generateDataRetrievingSimulationCompletedLog: (
    {
      gatewayName,
      transactionName,
      formattedRequestParameters,
      formattedResponseData
    }: MockGatewayHelper.Localization.DataRetrievingSimulationCompletedLog.CompoundParameter
  ): MockGatewayHelper.Localization.DataRetrievingSimulationCompletedLog =>
      ({
        title: `"${ gatewayName }.${ transactionName }", the simulation of the data retrieving has complete`,
        description:
            "The \"MockGatewayHelper\" class has finished the simulation of the data retrieving for the transaction " +
              `"${ gatewayName }.${ transactionName }".` +
            (isNonEmptyString(formattedRequestParameters) ? `\n\nRequest parameters:\n${ formattedRequestParameters }` : "") +
            isNonEmptyString(formattedResponseData) ? `\n\nResponse data:\n${ formattedResponseData }` : ""
      }),

  generateDataSubmittingSimulationCompletedLog: (
    {
      gatewayName,
      transactionName,
      formattedRequestData,
      formattedResponseData
    }: MockGatewayHelper.Localization.DataSubmittingSimulationCompletedLog.CompoundParameter
  ): MockGatewayHelper.Localization.DataSubmittingSimulationCompletedLog =>
      ({
        title: `"${ gatewayName }.${ transactionName }", the simulation of the data submitting has complete`,
        description:
            "The \"MockGatewayHelper\" class has finished the simulation of the data submitting for the transaction " +
              `"${ gatewayName }.${ transactionName }"` +
            (isNonEmptyString(formattedRequestData) ? `\n\nRequest data:\n${ formattedRequestData }` : "") +
            isNonEmptyString(formattedResponseData) ? `\n\nResponse data:\n${ formattedResponseData }` : ""
      })

};


export default MockGatewayHelperLocalization__English;
