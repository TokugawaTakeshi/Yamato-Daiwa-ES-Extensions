import { ModuleDynamicLoadingFailedError } from "@yamato-daiwa/es-extensions";


const ModuleDynamicLoadingFailedErrorLocalization__Russian: ModuleDynamicLoadingFailedError.Localization = {
  defaultTitle: "Ошибка при динамической загрузке модуля.",
  genericDescriptionPartTemplate: (
    namedParameters: ModuleDynamicLoadingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `Произошла ошибка при динамической подгрузке модуля ${namedParameters.modulePath}.`
};


export default ModuleDynamicLoadingFailedErrorLocalization__Russian;
