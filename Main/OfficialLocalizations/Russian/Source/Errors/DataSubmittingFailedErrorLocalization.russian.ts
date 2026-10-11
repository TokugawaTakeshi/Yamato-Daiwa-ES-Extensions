import type { DataSubmittingFailedError } from "@yamato-daiwa/es-extensions";


export const dataSubmittingFailedErrorLocalization__russian: DataSubmittingFailedError.Localization = {
  defaultTitle: "Ошибка при отправке данных",
  generateDescription: (
    { mentionToData }: DataSubmittingFailedError.Localization.DescriptionTemplateVariables
  ): string =>
      `Произошла ошибка при отправке данных "${ mentionToData }".`
};
