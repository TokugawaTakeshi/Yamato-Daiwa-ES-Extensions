import type { DataRetrievingFailedError } from "@yamato-daiwa/es-extensions";


const DataRetrievingFailedErrorLocalization__Japanese: DataRetrievingFailedError.Localization = {
  defaultTitle: "データ源からデータ取得失敗",
  generateDescription: (
    namedParameters: DataRetrievingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `外部情報源からのデータ「${ namedParameters.mentionToData }」の取得中不具合が発生した。`
};


export default DataRetrievingFailedErrorLocalization__Japanese;
