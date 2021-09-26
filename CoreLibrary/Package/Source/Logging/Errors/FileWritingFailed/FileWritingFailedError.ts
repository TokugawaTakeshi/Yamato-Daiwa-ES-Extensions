import FileWritingFailedErrorLocalization__English from "./FileWritingFailedErrorLocalization__English";


class FileWritingFailedError extends Error {

  public static readonly NAME: string = "FileWritingFailedError";
  public static get DEFAULT_TITLE(): string {
    return FileWritingFailedError.localization.defaultTitle;
  }

  private static localization: FileWritingFailedError.Localization = FileWritingFailedErrorLocalization__English;


  public static setLocalization(localization: FileWritingFailedError.Localization): void {
    FileWritingFailedError.localization = localization;
  }


  public constructor(parametersObject: FileWritingFailedError.ConstructorParametersObject) {

    super();

    this.name = FileWritingFailedError.NAME;

    if ("customMessage" in parametersObject) {
      this.message = parametersObject.customMessage;
    } else {
      this.message = FileWritingFailedError.localization.genericDescriptionPartTemplate(parametersObject);
    }
  }
}


namespace FileWritingFailedError {

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


export default FileWritingFailedError;
