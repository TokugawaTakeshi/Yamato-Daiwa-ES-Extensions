import type { ClassRedundantSubsequentInitializationError } from "@yamato-daiwa/es-extensions";


export const classRedundantSubsequentInitializationErrorLocalization__japanese:
    ClassRedundantSubsequentInitializationError.Localization =
{
  defaultTitle: "クラスの不要な再初期化",
  generateDescription:
      ({ className }: ClassRedundantSubsequentInitializationError.Localization.DescriptionTemplateVariables): string =>
          `クラス「${ className }」の初期化は、最初の一度しか認められていない。`
};
