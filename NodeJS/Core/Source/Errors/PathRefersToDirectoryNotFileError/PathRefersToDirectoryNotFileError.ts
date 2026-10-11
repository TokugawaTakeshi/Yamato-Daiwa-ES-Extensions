import pathRefersToDirectoryNotFileErrorLocalization__english from "./PathRefersToDirectoryNotFileErrorLocalization.english";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


class PathRefersToDirectoryNotFileError extends Error {

  public static readonly NAME: string = "PathRefersToDirectoryNotFileError";

  public static localization: PathRefersToDirectoryNotFileError.Localization =
      pathRefersToDirectoryNotFileErrorLocalization__english;


  public constructor(constructorParameter: PathRefersToDirectoryNotFileError.ConstructorParameter) {

    super();

    this.name = PathRefersToDirectoryNotFileError.NAME;

    this.message =
        "customMessage" in constructorParameter ?
            constructorParameter.customMessage :
            PathRefersToDirectoryNotFileError.localization.genericDescription(constructorParameter) +
                insertSubstring(
                  constructorParameter.messageSpecificPart,
                  { modifier: (messageSpecificPart: string): string => ` ${ messageSpecificPart }` }
                );

  }

}


namespace PathRefersToDirectoryNotFileError {

  export type ConstructorParameter = Readonly<
    {
      targetPath: string;
      messageSpecificPart?: string;
    } |
    { customMessage: string; }
  >;

  export type Localization = Readonly<{
    defaultTitle: string;
    genericDescription: (templateVariables: Localization.CommonDescription.TemplateVariables) => string;
  }>;

  export namespace Localization {
    export namespace CommonDescription {
      export type TemplateVariables = Readonly<{ targetPath: string; }>;
    }
  }

}


export default PathRefersToDirectoryNotFileError;
