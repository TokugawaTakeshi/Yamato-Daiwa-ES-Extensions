import type { ClassRequiredInitializationHasNotBeenExecutedError } from "@yamato-daiwa/es-extensions";


const ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__Japanese:
    ClassRequiredInitializationHasNotBeenExecutedError.Localization =
{
  defaultTitle: "クラス初期化が実行されず",
  generateDescription:
      (
        namedParameters: ClassRequiredInitializationHasNotBeenExecutedError.Localization.DescriptionTemplateNamedParameters
      ): string =>
          `クラス「${ namedParameters.className }」は初期化が要るが、初期化するメソッド「${ namedParameters.initializingMethodName }」` +
          "が呼び出されなかった。"
};


export default ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__Japanese;
