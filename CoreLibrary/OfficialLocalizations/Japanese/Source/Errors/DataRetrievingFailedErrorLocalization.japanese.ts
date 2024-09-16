import type { DataRetrievingFailedError } from "@yamato-daiwa/es-extensions";


export const dataRetrievingFailedErrorLocalization__japanese: DataRetrievingFailedError.Localization = {
  defaultTitle: "データ取得失敗",
  generateDescription: (
    { mentionToData }: DataRetrievingFailedError.Localization.DescriptionTemplateVariables
  ): string =>
      `外部情報源からのデータ「${ mentionToData }」の取得中に不具合発生。`
};
