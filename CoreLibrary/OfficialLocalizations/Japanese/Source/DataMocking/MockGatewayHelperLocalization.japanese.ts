import type { MockGatewayHelper } from "@yamato-daiwa/es-extensions";
import isNonEmptyString from "../../../../Package/Source/TypeGuards/Strings/isNonEmptyString";


const MockGatewayHelperLocalization__Japanese: MockGatewayHelper.Localization = {

  generateErrorSimulationCompletedLog: (
    {
      gatewayName,
      transactionName
    }: MockGatewayHelper.Localization.ErrorSimulationCompletedLog.CompoundParameter
  ): string =>
      `取り引き「${ gatewayName }.${ transactionName }」にとって「mustSimulateError」フラグは「真」に指定してあるので、` +
      "「MockGatewayHelper」クラスはエラーを再現した。",

  generateDataRetrievingSimulationCompletedLog: (
    {
      gatewayName,
      transactionName,
      formattedRequestParameters,
      formattedResponseData
    }: MockGatewayHelper.Localization.DataRetrievingSimulationCompletedLog.CompoundParameter
  ): MockGatewayHelper.Localization.DataRetrievingSimulationCompletedLog =>
      ({
        title: `取り引き「${ gatewayName }.${ transactionName }」、データ取得再現完了`,
        description: `クラス「MockGatewayHelper」は取り引き「${ gatewayName }.${ transactionName }」にとってデータの仮取得を完了した。\n` +
            `${ isNonEmptyString(formattedRequestParameters) ?
                `\n\n◇ リクエストパラメーター\n${ formattedRequestParameters }` : "" }` +
            `${ isNonEmptyString(formattedResponseData) ?
                `\n\n◇ リスポンスデータ\n${ formattedResponseData }` : "" }`
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
        title: `取り引き「${ gatewayName }.${ transactionName }」、データ送信再現完了`,
        description: `クラス「MockGatewayHelper」は取り引き「${ gatewayName }.${ transactionName }」にとってデータの仮送信完了した。\n` +
            `${ isNonEmptyString(formattedRequestData) ? `\n\n◇ リクエストデータ\n${ formattedRequestData }` : "" }` +
            `${ isNonEmptyString(formattedResponseData) ? `\n\n◇ リスポンスデータ\n${ formattedResponseData }` : "" }`
      })

};


export default MockGatewayHelperLocalization__Japanese;
