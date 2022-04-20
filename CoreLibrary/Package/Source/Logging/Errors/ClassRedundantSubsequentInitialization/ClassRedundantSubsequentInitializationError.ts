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

  export type ConstructorNamedParameters = { readonly customMessage: string; } | { readonly className: string; };

  export type Localization = {
    readonly defaultTitle: string;
    readonly generateDescription: (
      namedParameters: Localization.DescriptionTemplateNamedParameters
    ) => string;
  };

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = { readonly className: string; };
  }
}


export default ClassRedundantSubsequentInitializationError;
