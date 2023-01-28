import type { ClassRequiredInitializationHasNotBeenExecutedError } from "@yamato-daiwa/es-extensions";


const ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__Japanese:
    ClassRequiredInitializationHasNotBeenExecutedError.Localization =
{
  defaultTitle: "クラスが初期化されていない",
  generateDescription:
      (
        namedParameters: ClassRequiredInitializationHasNotBeenExecutedError.Localization.DescriptionTemplateNamedParameters
      ): string =>
          `クラス「${ namedParameters.className }」で、必要な初期化メソッド「${ namedParameters.initializingMethodName }」` +
          "が呼び出されていない。"
};


export default ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__Japanese;
