import ClassRedundantSubsequentInitializationErrorLocalization__English from
    "./ClassRedundantSubsequentInitializationErrorLocalization.english";


class ClassRedundantSubsequentInitializationError extends Error {

  public static readonly NAME: string = "ClassRedundantSubsequentInitializationError";
  public static localization: ClassRedundantSubsequentInitializationError.Localization =
      ClassRedundantSubsequentInitializationErrorLocalization__English;


  public constructor(namedParameters: ClassRedundantSubsequentInitializationError.ConstructorNamedParameters) {

    super();

    this.name = ClassRedundantSubsequentInitializationError.NAME;

    if ("customMessage" in namedParameters) {
      this.message = namedParameters.customMessage;
    } else {
      this.message = ClassRedundantSubsequentInitializationError.localization.generateDescription(namedParameters);
    }
  }
}


namespace ClassRedundantSubsequentInitializationError {

  export type ConstructorNamedParameters = Readonly<{ customMessage: string; }> | Readonly<{ className: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (namedParameters: Localization.DescriptionTemplateNamedParameters) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = Readonly<{ className: string; }>;
  }
}


export default ClassRedundantSubsequentInitializationError;
