import classRedundantSubsequentInitializationErrorLocalization__english from
    "./ClassRedundantSubsequentInitializationErrorLocalization.english";


class ClassRedundantSubsequentInitializationError extends Error {

  public static readonly NAME: string = "ClassRedundantSubsequentInitializationError";

  public static localization: ClassRedundantSubsequentInitializationError.Localization =
      classRedundantSubsequentInitializationErrorLocalization__english;


  public constructor(compoundParameter: ClassRedundantSubsequentInitializationError.ConstructorParameter) {

    super();

    this.name = ClassRedundantSubsequentInitializationError.NAME;

    this.message = "customMessage" in compoundParameter ?
        compoundParameter.customMessage :
        ClassRedundantSubsequentInitializationError.localization.generateDescription(compoundParameter);

  }

}


namespace ClassRedundantSubsequentInitializationError {

  export type ConstructorParameter =
      Readonly<{ customMessage: string; }> |
      Readonly<{ className: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (templateVariables: Localization.DescriptionTemplateVariables) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateVariables = Readonly<{ className: string; }>;
  }

}


export default ClassRedundantSubsequentInitializationError;
