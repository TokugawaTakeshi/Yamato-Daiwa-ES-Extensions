import type { ModuleDynamicLoadingFailedError } from "@yamato-daiwa/es-extensions";


const ModuleDynamicLoadingFailedErrorLocalization__Russian: ModuleDynamicLoadingFailedError.Localization = {
  defaultTitle: "Ошибка динамической подгрузки модуля",
  generateDescription: (
    namedParameters: ModuleDynamicLoadingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `Произошла ошибка при динамической подгрузке модуля '${ namedParameters.modulePath }'.`
};


export default ModuleDynamicLoadingFailedErrorLocalization__Russian;
