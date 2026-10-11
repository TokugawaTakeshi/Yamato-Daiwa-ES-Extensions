import type { ModuleDynamicLoadingFailedError } from "@yamato-daiwa/es-extensions";


export const moduleDynamicLoadingFailedErrorLocalization__russian: ModuleDynamicLoadingFailedError.Localization = {
  defaultTitle: "Ошибка динамической подгрузки модуля",
  generateDescription: (
    { modulePath }: ModuleDynamicLoadingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string =>
      `Произошла ошибка при динамической подгрузке модуля "${ modulePath }".`
};
