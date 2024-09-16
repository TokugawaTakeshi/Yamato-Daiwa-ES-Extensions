import classRequiredInitializationHasNotBeenExecutedErrorLocalization__english from
    "./ClassRequiredInitializationHasNotBeenExecutedErrorLocalization.english";


class ClassRequiredInitializationHasNotBeenExecutedError extends Error {

  public static readonly NAME: string = "ClassRequiredInitializationHasNotBeenExecutedError";

  public static localization: ClassRequiredInitializationHasNotBeenExecutedError.Localization =
      classRequiredInitializationHasNotBeenExecutedErrorLocalization__english;


  public constructor(compoundParameter: ClassRequiredInitializationHasNotBeenExecutedError.ConstructorParameter) {

    super();

    this.name = ClassRequiredInitializationHasNotBeenExecutedError.NAME;

    this.message = "customMessage" in compoundParameter ?
        compoundParameter.customMessage :
        ClassRequiredInitializationHasNotBeenExecutedError.localization.generateDescription(compoundParameter);

  }

}


namespace ClassRequiredInitializationHasNotBeenExecutedError {

  export type ConstructorParameter =
      Localization.DescriptionTemplateVariables |
      Readonly<{ readonly customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (templateVariables: Localization.DescriptionTemplateVariables) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateVariables = Readonly<{
      className: string;
      initializingMethodName: string;
    }>;
  }

}


export default ClassRequiredInitializationHasNotBeenExecutedError;
