import type { ClassRedundantSubsequentInitializationError } from "@yamato-daiwa/es-extensions";


const ClassRedundantSubsequentInitializationErrorLocalization__Japanese:
    ClassRedundantSubsequentInitializationError.Localization =
{
  defaultTitle: "クラスの不要再初期化",
  generateDescription:
      (namedParameters: ClassRedundantSubsequentInitializationError.Localization.DescriptionTemplateNamedParameters): string =>
          `クラス「${ namedParameters.className }」は一度切りの初期化型のクラスである。`
};


export default ClassRedundantSubsequentInitializationErrorLocalization__Japanese;
