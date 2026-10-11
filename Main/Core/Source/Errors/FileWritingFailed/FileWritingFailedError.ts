import fileWritingFailedErrorLocalization__english from "./FileWritingFailedErrorLocalization.english";


class FileWritingFailedError extends Error {

  public static readonly NAME: string = "FileWritingFailedError";

  public static localization: FileWritingFailedError.Localization = fileWritingFailedErrorLocalization__english;


  public constructor(compoundParameter: FileWritingFailedError.ConstructorParameter) {

    super();

    this.name = FileWritingFailedError.NAME;

    this.message = "customMessage" in compoundParameter ?
        compoundParameter.customMessage :
        FileWritingFailedError.localization.generateDescription(compoundParameter);

  }

}


namespace FileWritingFailedError {

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


export default FileWritingFailedError;
