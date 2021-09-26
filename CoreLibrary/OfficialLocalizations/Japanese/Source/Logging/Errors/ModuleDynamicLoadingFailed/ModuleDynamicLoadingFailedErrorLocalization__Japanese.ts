import { ModuleDynamicLoadingFailedError } from "@yamato-daiwa/es-extensions";


const ModuleDynamicLoadingFailedErrorLocalization__Japanese: ModuleDynamicLoadingFailedError.Localization = {
  defaultTitle: "モジュール動的ロードに失敗",
  genericDescriptionPartTemplate: (
    parametersObject: ModuleDynamicLoadingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `モジュール「${parametersObject.modulePath}」の動的ロード中不具合が発生した。`
};


export default ModuleDynamicLoadingFailedErrorLocalization__Japanese;
