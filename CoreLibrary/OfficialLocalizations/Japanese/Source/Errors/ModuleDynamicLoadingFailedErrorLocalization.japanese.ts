import type { ModuleDynamicLoadingFailedError } from "@yamato-daiwa/es-extensions";


export const moduleDynamicLoadingFailedErrorLocalization__japanese: ModuleDynamicLoadingFailedError.Localization = {
  defaultTitle: "モジュールの動的ロード失敗",
  generateDescription: (
    namedParameters: ModuleDynamicLoadingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `モジュール「${ namedParameters.modulePath }」の動的ロード中に不具合発生。`
};
