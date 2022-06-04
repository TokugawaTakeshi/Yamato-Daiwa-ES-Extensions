import ModuleDynamicLoadingFailedError from "./ModuleDynamicLoadingFailedError";


const ModuleDynamicLoadingFailedErrorLocalization__English: ModuleDynamicLoadingFailedError.Localization = {
  defaultTitle: "Module dynamic loading failure",
  generateDescription: (
    parametersObject: ModuleDynamicLoadingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `The dynamic loading of module '${parametersObject.modulePath}' failed.`
};


export default ModuleDynamicLoadingFailedErrorLocalization__English;
