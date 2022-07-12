import DesiredFileActuallyIsDirectoryErrorLocalization__English from "./DesiredFileActuallyIsDirectoryErrorLocalization.english";


class DesiredFileActuallyIsDirectoryError extends Error {

  public static readonly NAME: string = "DesiredFileActuallyIsDirectoryError";
  public static localization: DesiredFileActuallyIsDirectoryError.Localization =
      DesiredFileActuallyIsDirectoryErrorLocalization__English;


  public constructor(namedParameters: DesiredFileActuallyIsDirectoryError.ConstructorNamedParameters) {

    super();

    this.name = DesiredFileActuallyIsDirectoryError.NAME;

    if ("customMessage" in namedParameters) {
      this.message = namedParameters.customMessage;
    } else {
      this.message = DesiredFileActuallyIsDirectoryError.localization.genericDescription(namedParameters);
    }
  }
}


namespace DesiredFileActuallyIsDirectoryError {

  export type ConstructorNamedParameters = Localization.DescriptionTemplateNamedParameters | Readonly<{ customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    genericDescription: (
      namedParameters: Localization.DescriptionTemplateNamedParameters
    ) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = Readonly<{
      targetPath: string;
      messageSpecificPart?: string;
    }>;
  }
}


export default DesiredFileActuallyIsDirectoryError;
