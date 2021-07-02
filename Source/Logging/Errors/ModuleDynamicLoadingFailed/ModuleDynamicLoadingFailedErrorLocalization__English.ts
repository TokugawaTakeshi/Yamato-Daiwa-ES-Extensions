import ModuleDynamicLoadingFailedError from "./ModuleDynamicLoadingFailedError";


const ModuleDynamicLoadingFailedErrorLocalization__English: ModuleDynamicLoadingFailedError.Localization = {
  defaultTitle: "Module dynamic loading failure",
  genericDescriptionPartTemplate: (
    parametersObject: ModuleDynamicLoadingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `The dynamic loading of module '${parametersObject.modulePath}' failed.`
};


export default ModuleDynamicLoadingFailedErrorLocalization__English;
