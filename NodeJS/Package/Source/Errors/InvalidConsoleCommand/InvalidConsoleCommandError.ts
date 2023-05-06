import InvalidConsoleCommandErrorLocalization__English from "./InvalidConsoleCommandErrorLocalization.english";


class InvalidConsoleCommandError extends Error {

  public static readonly NAME: string = "InvalidConsoleCommandError";


  public constructor(parametersObject: InvalidConsoleCommandError.ConstructorParametersObject) {

    super();

    this.name = InvalidConsoleCommandError.NAME;

    this.message =
        "customMessage" in constructorParameter ?
            constructorParameter.customMessage :
            `${ InvalidConsoleCommandError.localization.generateDescriptionCommonPart(constructorParameter) }` +
                `${ constructorParameter.messageSpecificPart ?? "" }`;

  }

}


namespace InvalidConsoleCommandError {

  export type ConstructorParametersObject = Localization.DescriptionTemplateNamedParameters | { readonly customMessage: string; };

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (
      namedParameters: Localization.DescriptionTemplateNamedParameters
    ) => string;
  }>;

  export namespace Localization {
    export namespace CommonDescription {
      export type TemplateParameters = Readonly<{ applicationName: string; }>;
    }
  }

}


export default InvalidConsoleCommandError;
