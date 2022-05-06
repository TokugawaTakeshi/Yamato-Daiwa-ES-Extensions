import type { ModuleDynamicLoadingFailedError } from "@yamato-daiwa/es-extensions";


const ModuleDynamicLoadingFailedErrorLocalization__Japanese: ModuleDynamicLoadingFailedError.Localization = {
  defaultTitle: "モジュール動的ロードに失敗",
  generateDescription: (
    namedParameters: ModuleDynamicLoadingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `モジュール「${ namedParameters.modulePath }」の動的ロード中不具合が発生した。`
};


export default ModuleDynamicLoadingFailedErrorLocalization__Japanese;
