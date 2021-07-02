import ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English
  from "./ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English";


class ClassRequiredInitializationHasNotBeenExecutedError extends Error {

  public static readonly NAME: string = "ClassRequiredInitializationHasNotBeenExecutedError";
  public static get DEFAULT_TITLE(): string {
    return ClassRequiredInitializationHasNotBeenExecutedError.localization.defaultTitle;
  }

  private static localization: ClassRequiredInitializationHasNotBeenExecutedError.Localization =
      ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English;


  public static setLocalization(localization: ClassRequiredInitializationHasNotBeenExecutedError.Localization): void {
    ClassRequiredInitializationHasNotBeenExecutedError.localization = localization;
  }


  public constructor(parametersObject: ClassRequiredInitializationHasNotBeenExecutedError.ConstructorParametersObject) {

    super();

    this.name = ClassRequiredInitializationHasNotBeenExecutedError.NAME;

    if ("customMessage" in parametersObject) {
      this.message = parametersObject.customMessage;
    } else {
      this.message = ClassRequiredInitializationHasNotBeenExecutedError.localization.genericDescriptionPartTemplate(
        parametersObject
      );
    }
  }
}


namespace ClassRequiredInitializationHasNotBeenExecutedError {

  export type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | { customMessage: string; };

  export type Localization = {
    readonly defaultTitle: string;
    readonly genericDescriptionPartTemplate: (
      parametersObject: Localization.GenericDescriptionPartTemplateParameters
    ) => string;
  };

  export namespace Localization {
    export type GenericDescriptionPartTemplateParameters = {
      className: string;
      initializingMethodName: string;
    };
  }
}


export default ClassRequiredInitializationHasNotBeenExecutedError;
