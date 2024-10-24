import fileReadingFailedErrorLocalization__english from "./FileReadingFailedErrorLocalization.english";


class FileReadingFailedError extends Error {

  public static readonly NAME: string = "FileReadingFailedError";

  public static localization: FileReadingFailedError.Localization = fileReadingFailedErrorLocalization__english;


  public constructor(compoundParameter: FileReadingFailedError.ConstructorParameter) {

    super();

    this.name = FileReadingFailedError.NAME;

    this.message = "customMessage" in compoundParameter ?
        compoundParameter.customMessage :
        FileReadingFailedError.localization.generateDescription(compoundParameter);

  }

}


namespace FileReadingFailedError {

  export type ConstructorParameter =
      Localization.DescriptionTemplateVariables |
      Readonly<{ customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (templateVariables: Localization.DescriptionTemplateVariables) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateVariables = Readonly<{ filePath: string; }>;
  }

}


export default FileReadingFailedError;
