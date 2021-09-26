import { DataSubmittingFailedError } from "@yamato-daiwa/es-extensions";


const DataSubmittingFailedErrorLocalization__Japanese: DataSubmittingFailedError.Localization = {
  defaultTitle: "データ送信失敗",
  genericDescriptionPartTemplate: (
    parametersObject: DataSubmittingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `データ「${parametersObject.mentionToData}」の送信に失敗。`
};


export default DataSubmittingFailedErrorLocalization__Japanese;
