import type { DataRetrievingFailedError } from "@yamato-daiwa/es-extensions";


const DataRetrievingFailedErrorLocalization__Japanese: DataRetrievingFailedError.Localization = {
  defaultTitle: "データ取得失敗",
  generateDescription: (
    namedParameters: DataRetrievingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `外部情報源からのデータ「${ namedParameters.mentionToData }」の取得中に不具合発生。`
};


export default DataRetrievingFailedErrorLocalization__Japanese;
