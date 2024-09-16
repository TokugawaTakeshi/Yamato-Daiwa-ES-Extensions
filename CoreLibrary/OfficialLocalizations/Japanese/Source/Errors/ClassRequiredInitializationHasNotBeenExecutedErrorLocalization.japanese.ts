import type { ClassRequiredInitializationHasNotBeenExecutedError } from "@yamato-daiwa/es-extensions";


export const classRequiredInitializationHasNotBeenExecutedErrorLocalization__japanese:
    ClassRequiredInitializationHasNotBeenExecutedError.Localization =
{
  defaultTitle: "クラスが初期化されていない",
  generateDescription:
      (
        {
          className,
          initializingMethodName
        }: ClassRequiredInitializationHasNotBeenExecutedError.Localization.DescriptionTemplateVariables
      ): string =>
          `クラス「${ className }」で、必要な初期化メソッド「${ initializingMethodName }」が呼び出されていない。`
};
