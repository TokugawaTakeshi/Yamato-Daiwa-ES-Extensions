import { ClassRequiredInitializationHasNotBeenExecutedError } from "@yamato-daiwa/es-extensions";


const ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__Japanese:
    ClassRequiredInitializationHasNotBeenExecutedError.Localization = {

  defaultTitle: "クラス初期化が実行されず",
  genericDescriptionPartTemplate:
      (
        parametersObject: ClassRequiredInitializationHasNotBeenExecutedError.Localization.
            GenericDescriptionPartTemplateParameters
      ): string =>
          `クラス：「${parametersObject.className}」は初期化が要るが、初期化するメソッド:「${parametersObject.initializingMethodName}」` +
          "が呼び出されなかった。"
};


export default ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__Japanese;
