import moduleDynamicLoadingFailedErrorLocalization__english from "./ModuleDynamicLoadingFailedErrorLocalization.english";


class ModuleDynamicLoadingFailedError extends Error {

  public static readonly NAME: string = "ModuleDynamicLoadingFailure";

  public static localization: ModuleDynamicLoadingFailedError.Localization =
      moduleDynamicLoadingFailedErrorLocalization__english;


  public constructor(compoundParameter: ModuleDynamicLoadingFailedError.ConstructorNamedParameters) {

    super();

    this.name = ModuleDynamicLoadingFailedError.NAME;

    this.message = "customMessage" in compoundParameter ?
        compoundParameter.customMessage :
        ModuleDynamicLoadingFailedError.localization.generateDescription(compoundParameter);

  }

}


namespace ModuleDynamicLoadingFailedError {

  export type ConstructorNamedParameters =
      Localization.DescriptionTemplateNamedParameters |
      Readonly<{ customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (templateVariables: Localization.DescriptionTemplateNamedParameters) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = Readonly<{ modulePath: string; }>;
  }

}


export default ModuleDynamicLoadingFailedError;
