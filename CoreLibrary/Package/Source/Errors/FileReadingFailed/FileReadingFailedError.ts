import FileReadingFailedErrorLocalization__English from "./FileReadingFailedErrorLocalization.english";


class FileReadingFailedError extends Error {

  public static readonly NAME: string = "FileReadingFailure";
  public static localization: FileReadingFailedError.Localization = FileReadingFailedErrorLocalization__English;


  public constructor(namedParameters: FileReadingFailedError.ConstructorNamedParameters) {

    super();

    this.name = FileReadingFailedError.NAME;

    if ("customMessage" in namedParameters) {
      this.message = namedParameters.customMessage;
    } else {
      this.message = FileReadingFailedError.localization.generateDescription(namedParameters);
    }
  }
}


namespace FileReadingFailedError {

  export type ConstructorNamedParameters = Localization.DescriptionTemplateNamedParameters | Readonly<{ customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (namedParameters: Localization.DescriptionTemplateNamedParameters) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = Readonly<{ filePath: string; }>;
  }
}


export default FileReadingFailedError;
