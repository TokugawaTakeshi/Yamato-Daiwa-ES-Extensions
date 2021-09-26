import { ModuleDynamicLoadingFailedError } from "@yamato-daiwa/es-extensions";


const ModuleDynamicLoadingFailedErrorLocalization__Russian: ModuleDynamicLoadingFailedError.Localization = {
  defaultTitle: "Ошибка при динамической загрузке модуля.",
  genericDescriptionPartTemplate: (
    parametersObject: ModuleDynamicLoadingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `Произошла ошибка при динамической подгрузке модуля ${parametersObject.modulePath}.`
};


export default ModuleDynamicLoadingFailedErrorLocalization__Russian;
