import FileReadingFailedErrorLocalization__English from "./FileReadingFailedErrorLocalization__English";


class FileReadingFailedError extends Error {

  public static readonly NAME: string = "FileReadingFailure";
  public static get DEFAULT_TITLE(): string {
    return FileReadingFailedError.localization.defaultTitle;
  }

  private static localization: FileReadingFailedError.Localization = FileReadingFailedErrorLocalization__English;


  public static setLocalization(localization: FileReadingFailedError.Localization): void {
    FileReadingFailedError.localization = localization;
  }


  public constructor(parametersObject: FileReadingFailedError.ConstructorParametersObject) {

    super();

    this.name = FileReadingFailedError.NAME;

    if ("customMessage" in parametersObject) {
      this.message = parametersObject.customMessage;
    } else {
      this.message = FileReadingFailedError.localization.genericDescriptionPartTemplate(parametersObject);
    }
  }
}


namespace FileReadingFailedError {

  export type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | { customMessage: string; };

  export type Localization = {
    readonly defaultTitle: string;
    readonly genericDescriptionPartTemplate: (
      parametersObject: Localization.GenericDescriptionPartTemplateParameters
    ) => string;
  };

  export namespace Localization {
    export type GenericDescriptionPartTemplateParameters = {
      filePath: string;
    };
  }
}


export default FileReadingFailedError;
