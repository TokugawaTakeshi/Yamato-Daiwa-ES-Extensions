import ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English from
    "./ClassRequiredInitializationHasNotBeenExecutedErrorLocalization.english";


class ClassRequiredInitializationHasNotBeenExecutedError extends Error {

  public static readonly NAME: string = "ClassRequiredInitializationHasNotBeenExecutedError";
  public static localization: ClassRequiredInitializationHasNotBeenExecutedError.Localization =
      ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English;


  public constructor(namedParameters: ClassRequiredInitializationHasNotBeenExecutedError.ConstructorNamedParameters) {

    super();

    this.name = ClassRequiredInitializationHasNotBeenExecutedError.NAME;

    if ("customMessage" in namedParameters) {
      this.message = namedParameters.customMessage;
    } else {
      this.message = ClassRequiredInitializationHasNotBeenExecutedError.localization.generateDescription(namedParameters);
    }
  }
}


namespace ClassRequiredInitializationHasNotBeenExecutedError {

  export type ConstructorNamedParameters =
      Localization.DescriptionTemplateNamedParameters | Readonly<{ readonly customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (namedParameters: Localization.DescriptionTemplateNamedParameters) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = Readonly<{
      className: string;
      initializingMethodName: string;
    }>;
  }
}


export default ClassRequiredInitializationHasNotBeenExecutedError;
