import InvalidConsoleCommandErrorLocalization__English from "./InvalidConsoleCommandErrorLocalization.english";


class InvalidConsoleCommandError extends Error {

  public static readonly NAME: string = "InvalidConsoleCommandError";
  public static localization: InvalidConsoleCommandError.Localization = InvalidConsoleCommandErrorLocalization__English;


  public constructor(parametersObject: InvalidConsoleCommandError.ConstructorParametersObject) {

    super();

    this.name = InvalidConsoleCommandError.NAME;

    if ("customMessage" in parametersObject) {
      this.message = parametersObject.customMessage;
    } else {
      this.message = InvalidConsoleCommandError.localization.generateDescription(parametersObject);
    }
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
    export type DescriptionTemplateNamedParameters = Readonly<{
      applicationName: string;
      messageSpecificPart?: string;
    }>;
  }
}


export default InvalidConsoleCommandError;
