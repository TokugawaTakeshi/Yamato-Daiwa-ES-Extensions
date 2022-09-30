import type { ClassRedundantSubsequentInitializationError } from "@yamato-daiwa/es-extensions";


const ClassRedundantSubsequentInitializationErrorLocalization__Japanese:
    ClassRedundantSubsequentInitializationError.Localization =
{
  defaultTitle: "クラスの不要な再初期化",
  generateDescription:
      (namedParameters: ClassRedundantSubsequentInitializationError.Localization.DescriptionTemplateNamedParameters): string =>
          `クラス「${ namedParameters.className }」の初期化は、最初の一度しか認められていない。`
};


export default ClassRedundantSubsequentInitializationErrorLocalization__Japanese;
