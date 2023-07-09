import invalidConsoleCommandErrorLocalization__english from "./InvalidConsoleCommandErrorLocalization.english";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


class InvalidConsoleCommandError extends Error {

  public static readonly NAME: string = "InvalidConsoleCommandError";

  public static localization: InvalidConsoleCommandError.Localization = invalidConsoleCommandErrorLocalization__english;


  public constructor(constructorParameter: InvalidConsoleCommandError.ConstructorParameter) {

    super();

    this.name = InvalidConsoleCommandError.NAME;

    this.message =
        "customMessage" in constructorParameter ?
            constructorParameter.customMessage :
            `${ InvalidConsoleCommandError.localization.generateDescriptionCommonPart(constructorParameter) }` +
                `${ 
                  insertSubstring(
                    constructorParameter.messageSpecificPart,
                      { modifier: (messageSpecificPart: string): string => ` ${ messageSpecificPart }` }
                  )
                }`;

  }

}


namespace InvalidConsoleCommandError {

  export type ConstructorParameter = Readonly<
    {
      applicationName: string;
      messageSpecificPart?: string;
    } |
    { customMessage: string; }
  >;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescriptionCommonPart: (templateVariables: Localization.CommonDescription.TemplateVariables) => string;
  }>;

  export namespace Localization {
    export namespace CommonDescription {
      export type TemplateVariables = Readonly<{ applicationName: string; }>;
    }
  }

}


export default InvalidConsoleCommandError;
