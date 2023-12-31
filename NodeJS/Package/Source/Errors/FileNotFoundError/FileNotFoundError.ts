import fileNotFoundErrorLocalization__english from "./FileNotFoundErrorLocalization.english";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


class FileNotFoundError extends Error {

  public static readonly NAME: string = "FileNotFoundError";

  public static localization: FileNotFoundError.Localization = fileNotFoundErrorLocalization__english;


  public constructor(constructorParameter: FileNotFoundError.ConstructorParameter) {

    super();

    this.name = FileNotFoundError.NAME;

    this.message =
        "customMessage" in constructorParameter ?
            constructorParameter.customMessage :
            `${ FileNotFoundError.localization.generateDescriptionCommonPart(constructorParameter) }` +
                `${
                  insertSubstring(
                    constructorParameter.messageSpecificPart,
                    { modifier: (messageSpecificPart: string): string => ` ${ messageSpecificPart }` }
                  )
                }`;

  }

}


namespace FileNotFoundError {

  export type ConstructorParameter = Readonly<
    {
      filePath: string;
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
      export type TemplateVariables = Readonly<{ filePath: string; }>;
    }
  }

}


export default FileNotFoundError;
