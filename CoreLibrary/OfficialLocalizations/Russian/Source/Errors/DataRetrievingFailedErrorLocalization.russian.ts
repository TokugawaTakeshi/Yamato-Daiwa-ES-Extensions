import type { DataRetrievingFailedError } from "@yamato-daiwa/es-extensions";


export const dataRetrievingFailedErrorLocalization__russian: DataRetrievingFailedError.Localization = {
  defaultTitle: "Ошибка при получении данных",
  generateDescription: (
    { mentionToData }: DataRetrievingFailedError.Localization.DescriptionTemplateVariables
  ): string =>
      `Произошла ошибка при получении данных "${ mentionToData }" из внешнего источника.`
};
