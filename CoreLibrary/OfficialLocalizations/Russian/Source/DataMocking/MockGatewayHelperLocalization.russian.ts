import type { MockGatewayHelper } from "@yamato-daiwa/es-extensions";
import isNonEmptyString from "../../../../Package/Source/TypeGuards/Strings/isNonEmptyString";


const MockGatewayHelperLocalization__Russian: MockGatewayHelper.Localization = {

  generateErrorSimulationCompletedLog: (
    {
      gatewayName,
      transactionName
    }: MockGatewayHelper.Localization.ErrorSimulationCompletedLog.CompoundParameter
  ): string =>
      `Класс "MockGatewayHelper" инсценировал ошибку для транзакции "${ gatewayName }.${ transactionName }" ` +
      "потому что опция \"mustSimulateError\" установлена в значение \"истина\".",

  generateDataRetrievingSimulationCompletedLog: (
    {
      gatewayName,
      transactionName,
      formattedRequestParameters,
      formattedResponseData
    }: MockGatewayHelper.Localization.DataRetrievingSimulationCompletedLog.CompoundParameter
  ): MockGatewayHelper.Localization.DataRetrievingSimulationCompletedLog =>
      ({
        title: `"${ gatewayName }.${ transactionName }", симуляция получения данных завершена`,
        description: "Класс \"MockGatewayHelper\" завершил симуляцию получения данных для транзакции " +
            `"${ gatewayName }.${ transactionName }".\n` +
            `${ isNonEmptyString(formattedRequestParameters) ?
                `\n\nПараметры запроса:\n${ formattedRequestParameters }` : "" }` +
            `${ isNonEmptyString(formattedResponseData) ?
                `\n\nДанные ответа:\n${ formattedResponseData }` : "" }`
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
        title: `"${ gatewayName }.${ transactionName }", симуляция отправки данных завершена`,
        description: "Класс \"MockGatewayHelper\" завершил симуляцию отправки данных для транзакции " +
            `"${ gatewayName }.${ transactionName }".\n` +
            `${ isNonEmptyString(formattedRequestData) ? `\n\nДанные запроса:\n${ formattedRequestData }` : "" }` +
            `${ isNonEmptyString(formattedResponseData) ? `\n\nДанные ответа:\n${ formattedResponseData }` : "" }`
      })

};


export default MockGatewayHelperLocalization__Russian;
