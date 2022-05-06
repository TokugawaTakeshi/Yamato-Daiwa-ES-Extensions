import FileWritingFailedErrorLocalization__English from "./FileWritingFailedErrorLocalization.english";


class FileWritingFailedError extends Error {

  public static readonly NAME: string = "FileWritingFailedError";
  public static localization: FileWritingFailedError.Localization = FileWritingFailedErrorLocalization__English;


  public constructor(parametersObject: FileWritingFailedError.ConstructorNamedParameters) {

    super();

    this.name = FileWritingFailedError.NAME;

    if ("customMessage" in parametersObject) {
      this.message = parametersObject.customMessage;
    } else {
      this.message = FileWritingFailedError.localization.generateDescription(parametersObject);
    }
  }
}


namespace FileWritingFailedError {

  export type ConstructorNamedParameters = Localization.DescriptionTemplateNamedParameters | { customMessage: string; };

  export type Localization = {
    readonly defaultTitle: string;
    readonly generateDescription: (
      parametersObject: Localization.DescriptionTemplateNamedParameters
    ) => string;
  };

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = {
      filePath: string;
    };
  }
}


export default FileWritingFailedError;
