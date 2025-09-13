import type ModuleDynamicLoadingFailedError from "./ModuleDynamicLoadingFailedError";


const moduleDynamicLoadingFailedErrorLocalization__english: ModuleDynamicLoadingFailedError.Localization = {
  defaultTitle: "Module Dynamic Loading Failed",
  generateDescription: (
    { modulePath }: ModuleDynamicLoadingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `The dynamic loading of module "${ modulePath }" failed.`
};


export default moduleDynamicLoadingFailedErrorLocalization__english;
