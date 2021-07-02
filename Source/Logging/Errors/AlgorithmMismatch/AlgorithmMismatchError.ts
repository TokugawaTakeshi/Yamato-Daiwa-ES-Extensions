import AlgorithmMismatchErrorLocalization__English from "./AlgorithmMismatchErrorLocalization__English";


class AlgorithmMismatchError extends Error {

  public static readonly NAME: string = "AlgorithmMismatchError";
  public static get DEFAULT_TITLE(): string {
    return AlgorithmMismatchError.localization.defaultTitle;
  }


  private static localization: AlgorithmMismatchError.Localization = AlgorithmMismatchErrorLocalization__English;


  public static setLocalization(localization: AlgorithmMismatchError.Localization): void {
    AlgorithmMismatchError.localization = localization;
  }


  public constructor(message: string) {

    super();

    this.name = AlgorithmMismatchError.NAME;
    this.message = message;
  }
}


namespace AlgorithmMismatchError {
  export type Localization = {
    readonly defaultTitle: string;
  };
}


export default AlgorithmMismatchError;
