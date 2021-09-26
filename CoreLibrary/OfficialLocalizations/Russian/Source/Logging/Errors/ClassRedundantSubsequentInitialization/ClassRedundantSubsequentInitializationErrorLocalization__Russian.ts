import { ClassRedundantSubsequentInitializationError } from "@yamato-daiwa/es-extensions";


const ClassRedundantSubsequentInitializationErrorLocalization__Russian:
    ClassRedundantSubsequentInitializationError.Localization =
{
  defaultTitle: "Ненужная повторная инициализация класса",
  genericDescriptionPartTemplate:
    (
      parametersObject: ClassRedundantSubsequentInitializationError.Localization.GenericDescriptionPartTemplateParameters
    ): string => `Класс '${parametersObject.className}' должен быть инициализирован только один раз.`
};

export default ClassRedundantSubsequentInitializationErrorLocalization__Russian;
