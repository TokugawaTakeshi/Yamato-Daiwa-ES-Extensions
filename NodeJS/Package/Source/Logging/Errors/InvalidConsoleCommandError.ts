import InvalidConsoleCommandErrorLocalization__English from "./InvalidConsoleCommandErrorLocalization__English";


class InvalidConsoleCommandError extends Error {

  public static readonly NAME: string = "InvalidConsoleCommandError";
  public static get DEFAULT_TITLE(): string {
    return InvalidConsoleCommandError.localization.defaultTitle;
  }


  private static localization: InvalidConsoleCommandError.Localization = InvalidConsoleCommandErrorLocalization__English;


  public static setLocalization(localization: InvalidConsoleCommandError.Localization): void {
    InvalidConsoleCommandError.localization = localization;
  }


  public constructor(parametersObject: InvalidConsoleCommandError.ConstructorParametersObject) {

    super();

    this.name = InvalidConsoleCommandError.NAME;

    if ("customMessage" in parametersObject) {
      this.message = parametersObject.customMessage;
    } else {
      this.message = InvalidConsoleCommandError.localization.genericDescriptionPartTemplate(parametersObject);
    }
  }
}


namespace InvalidConsoleCommandError {

  export type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | { customMessage: string; };

  export type Localization = {
    readonly defaultTitle: string;
    readonly genericDescriptionPartTemplate: (
      parametersObject: Localization.GenericDescriptionPartTemplateParameters
    ) => string;
  };

  export namespace Localization {
    export type GenericDescriptionPartTemplateParameters = {
      applicationName: string;
      messageSpecificPart?: string;
    };
  }
}


export default InvalidConsoleCommandError;
