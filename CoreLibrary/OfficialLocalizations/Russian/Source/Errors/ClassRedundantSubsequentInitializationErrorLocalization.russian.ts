import type { ClassRedundantSubsequentInitializationError } from "@yamato-daiwa/es-extensions";


export const classRedundantSubsequentInitializationErrorLocalization__russian:
    ClassRedundantSubsequentInitializationError.Localization =
{
  defaultTitle: "Ненужная повторная инициализация класса",
  generateDescription:
      ({ className }: ClassRedundantSubsequentInitializationError.Localization.DescriptionTemplateVariables): string =>
          `Класс "${ className }" должен быть инициализирован только один раз.`
};
