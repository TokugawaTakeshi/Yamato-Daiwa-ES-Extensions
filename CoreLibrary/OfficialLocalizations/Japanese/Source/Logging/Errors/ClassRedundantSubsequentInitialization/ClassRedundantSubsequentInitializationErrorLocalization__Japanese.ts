import { ClassRedundantSubsequentInitializationError } from "@yamato-daiwa/es-extensions";


const ClassRedundantSubsequentInitializationErrorLocalization__Japanese:
    ClassRedundantSubsequentInitializationError.Localization =
{
  defaultTitle: "クラスの不要再初期化",
  genericDescriptionPartTemplate:
    (
      parametersObject: ClassRedundantSubsequentInitializationError.Localization.GenericDescriptionPartTemplateParameters
    ): string => `クラス「${parametersObject.className}」は一度切りの初期化型。`
};

export default ClassRedundantSubsequentInitializationErrorLocalization__Japanese;
