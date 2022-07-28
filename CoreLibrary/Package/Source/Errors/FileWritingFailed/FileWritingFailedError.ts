import FileWritingFailedErrorLocalization__English from "./FileWritingFailedErrorLocalization.english";


class FileWritingFailedError extends Error {

  public static readonly NAME: string = "FileWritingFailedError";
  public static localization: FileWritingFailedError.Localization = FileWritingFailedErrorLocalization__English;


  public constructor(namedParameters: FileWritingFailedError.ConstructorNamedParameters) {

    super();

    this.name = FileWritingFailedError.NAME;

    if ("customMessage" in namedParameters) {
      this.message = namedParameters.customMessage;
    } else {
      this.message = FileWritingFailedError.localization.generateDescription(namedParameters);
    }
  }
}


namespace FileWritingFailedError {

  export type ConstructorNamedParameters = Localization.DescriptionTemplateNamedParameters | Readonly<{ customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (namedParameters: Localization.DescriptionTemplateNamedParameters) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = Readonly<{ filePath: string; }>;
  }
}


export default FileWritingFailedError;
