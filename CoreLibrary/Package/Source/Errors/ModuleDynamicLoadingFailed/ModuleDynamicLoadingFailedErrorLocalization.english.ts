import type ModuleDynamicLoadingFailedError from "./ModuleDynamicLoadingFailedError";


const moduleDynamicLoadingFailedErrorLocalization__english: ModuleDynamicLoadingFailedError.Localization = {
  defaultTitle: "Module dynamic loading failure",
  generateDescription: (
    { modulePath }: ModuleDynamicLoadingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `The dynamic loading of module "${ modulePath }" failed.`
};


export default moduleDynamicLoadingFailedErrorLocalization__english;
