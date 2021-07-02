import ModuleDynamicLoadingFailedErrorLocalization__English
  from "./ModuleDynamicLoadingFailedErrorLocalization__English";

class ModuleDynamicLoadingFailedError extends Error {

  public static readonly NAME: string = "ModuleDynamicLoadingFailure";
  public static get DEFAULT_TITLE(): string {
    return ModuleDynamicLoadingFailedError.localization.defaultTitle;
  }

  private static localization: ModuleDynamicLoadingFailedError.Localization =
      ModuleDynamicLoadingFailedErrorLocalization__English;


  public static setLocalization(localization: ModuleDynamicLoadingFailedError.Localization): void {
    ModuleDynamicLoadingFailedError.localization = localization;
  }


  public constructor(parametersObject: ModuleDynamicLoadingFailedError.ConstructorParametersObject) {

    super();

    this.name = ModuleDynamicLoadingFailedError.NAME;

    if ("customMessage" in parametersObject) {
      this.message = parametersObject.customMessage;
    } else {
      this.message = ModuleDynamicLoadingFailedError.localization.genericDescriptionPartTemplate(parametersObject);
    }
  }
}


namespace ModuleDynamicLoadingFailedError {

  export type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | { customMessage: string; };

  export type Localization = {
    readonly defaultTitle: string;
    readonly genericDescriptionPartTemplate: (
      parametersObject: Localization.GenericDescriptionPartTemplateParameters
    ) => string;
  };

  export namespace Localization {
    export type GenericDescriptionPartTemplateParameters = {
      modulePath: string;
    };
  }
}


export default ModuleDynamicLoadingFailedError;
