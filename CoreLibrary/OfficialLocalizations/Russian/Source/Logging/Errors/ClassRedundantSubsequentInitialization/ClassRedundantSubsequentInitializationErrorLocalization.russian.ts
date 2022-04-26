import type { ClassRedundantSubsequentInitializationError } from "@yamato-daiwa/es-extensions";


const ClassRedundantSubsequentInitializationErrorLocalizationRussian:
    ClassRedundantSubsequentInitializationError.Localization =
{
  defaultTitle: "Ненужная повторная инициализация класса",
  generateDescription:
    (namedParameters: ClassRedundantSubsequentInitializationError.Localization.DescriptionTemplateNamedParameters): string =>
        `Класс '${ namedParameters.className }' должен быть инициализирован только один раз.`
};


export default ClassRedundantSubsequentInitializationErrorLocalizationRussian;
