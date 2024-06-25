import type { DataSubmittingFailedError } from "@yamato-daiwa/es-extensions";


export const dataSubmittingFailedErrorLocalization__japanese: DataSubmittingFailedError.Localization = {
  defaultTitle: "データ送信失敗",
  generateDescription: (
    { mentionToData }: DataSubmittingFailedError.Localization.DescriptionTemplateVariables
  ): string =>
      `データ「${ mentionToData }」の送信中に不具合発生。`
};
