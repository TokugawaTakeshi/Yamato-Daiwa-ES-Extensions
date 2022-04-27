import type { DataSubmittingFailedError } from "@yamato-daiwa/es-extensions";


const DataSubmittingFailedErrorLocalization__Japanese: DataSubmittingFailedError.Localization = {
  defaultTitle: "データ送信失敗",
  generateDescription: (
    namedParameters: DataSubmittingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `データ「${ namedParameters.mentionToData }」の送信中に不具合が発生。`
};


export default DataSubmittingFailedErrorLocalization__Japanese;
