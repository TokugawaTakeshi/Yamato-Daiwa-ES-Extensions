import { ClassRedundantSubsequentInitializationError } from "@yamato-daiwa/es-extensions";


const ClassRedundantSubsequentInitializationErrorLocalizationJapanese:
    ClassRedundantSubsequentInitializationError.Localization =
{
  defaultTitle: "クラスの不要再初期化",
  generateDescription:
      (namedParameters: ClassRedundantSubsequentInitializationError.Localization.GenericDescriptionPartTemplateParameters): string =>
          `クラス「${namedParameters.className}」は一度切りの初期化型である。`
};


export default ClassRedundantSubsequentInitializationErrorLocalizationJapanese;
