import FileNotFoundErrorLocalization__English from "./FileNotFoundErrorLocalization.english";


class FileNotFoundError extends Error {

  public static readonly NAME: string = "FileNotFoundError";
  public static localization: FileNotFoundError.Localization = FileNotFoundErrorLocalization__English;


  public constructor(namedParameters: FileNotFoundError.ConstructorNamedParameters) {

    super();

    this.name = FileNotFoundError.NAME;

    if ("customMessage" in namedParameters) {
      this.message = namedParameters.customMessage;
    } else {
      this.message = FileNotFoundError.localization.genericDescription(namedParameters);
    }
  }
}


namespace FileNotFoundError {

  export type ConstructorNamedParameters = Localization.DescriptionTemplateNamedParameters | Readonly<{ customMessage: string; }>;

  export type Localization = Readonly<{
    readonly defaultTitle: string;
    readonly genericDescription: (
      namedParameters: Localization.DescriptionTemplateNamedParameters
    ) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = Readonly<{
      filePath: string;
      messageSpecificPart?: string;
    }>;
  }
}


export default FileNotFoundError;
