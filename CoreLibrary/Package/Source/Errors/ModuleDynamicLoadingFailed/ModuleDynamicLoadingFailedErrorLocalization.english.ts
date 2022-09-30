import type ModuleDynamicLoadingFailedError from "./ModuleDynamicLoadingFailedError";


const ModuleDynamicLoadingFailedErrorLocalization__English: ModuleDynamicLoadingFailedError.Localization = {
  defaultTitle: "Module dynamic loading failure",
  generateDescription: (
    namedParameters: ModuleDynamicLoadingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `The dynamic loading of module '${ namedParameters.modulePath }' failed.`
};


export default ModuleDynamicLoadingFailedErrorLocalization__English;
