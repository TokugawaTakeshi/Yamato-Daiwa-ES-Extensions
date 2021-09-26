import ClassRedundantSubsequentInitializationErrorLocalization__English
  from "./ClassRedundantSubsequentInitializationErrorLocalization__English";


class ClassRedundantSubsequentInitializationError extends Error {

  public static readonly NAME: string = "RedundantSubsequentClassInitializationError";
  public static get DEFAULT_TITLE(): string {
    return ClassRedundantSubsequentInitializationError.localization.defaultTitle;
  }

  private static localization: ClassRedundantSubsequentInitializationError.Localization =
      ClassRedundantSubsequentInitializationErrorLocalization__English;


  public static setLocalization(localization: ClassRedundantSubsequentInitializationError.Localization): void {
    ClassRedundantSubsequentInitializationError.localization = localization;
  }


  public constructor(parametersObject: ClassRedundantSubsequentInitializationError.ConstructorParametersObject) {

    super();

    this.name = ClassRedundantSubsequentInitializationError.NAME;

    if ("customMessage" in parametersObject) {
      this.message = parametersObject.customMessage;
    } else {
      this.message = ClassRedundantSubsequentInitializationError.localization.genericDescriptionPartTemplate(parametersObject);
    }
  }
}


namespace ClassRedundantSubsequentInitializationError {

  export type ConstructorParametersObject = { customMessage: string; } | { className: string; };

  export type Localization = {
    readonly defaultTitle: string;
    readonly genericDescriptionPartTemplate: (
      parametersObject: Localization.GenericDescriptionPartTemplateParameters
    ) => string;
  };

  export namespace Localization {
    export type GenericDescriptionPartTemplateParameters = { className: string; };
  }
}


export default ClassRedundantSubsequentInitializationError;
