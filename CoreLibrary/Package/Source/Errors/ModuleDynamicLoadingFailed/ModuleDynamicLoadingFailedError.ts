import ModuleDynamicLoadingFailedErrorLocalization__English from "./ModuleDynamicLoadingFailedErrorLocalization.english";


class ModuleDynamicLoadingFailedError extends Error {

  public static readonly NAME: string = "ModuleDynamicLoadingFailure";
  public static localization: ModuleDynamicLoadingFailedError.Localization =
      ModuleDynamicLoadingFailedErrorLocalization__English;


  public constructor(namedParameters: ModuleDynamicLoadingFailedError.ConstructorNamedParameters) {

    super();

    this.name = ModuleDynamicLoadingFailedError.NAME;

    if ("customMessage" in namedParameters) {
      this.message = namedParameters.customMessage;
    } else {
      this.message = ModuleDynamicLoadingFailedError.localization.generateDescription(namedParameters);
    }
  }
}


namespace ModuleDynamicLoadingFailedError {

  export type ConstructorNamedParameters = Localization.DescriptionTemplateNamedParameters | Readonly<{ customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (namedParameters: Localization.DescriptionTemplateNamedParameters) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = Readonly<{ modulePath: string; }>;
  }
}


export default ModuleDynamicLoadingFailedError;
