import UnexpectedEventErrorLocalization__English from "./UnexpectedEventErrorLocalization__English";


class UnexpectedEventError extends Error {

  public static readonly NAME: string = "UnexpectedEventError";
  public static get DEFAULT_TITLE(): string {
    return UnexpectedEventError.localization.defaultTitle;
  }

  private static localization: UnexpectedEventError.Localization = UnexpectedEventErrorLocalization__English;


  public static setLocalization(localization: UnexpectedEventError.Localization): void {
    UnexpectedEventError.localization = localization;
  }


  public constructor(message: string) {

    super();

    this.name = UnexpectedEventError.NAME;
    this.message = message;
  }
}


namespace UnexpectedEventError {
  export type Localization = {
    readonly defaultTitle: string;
  };
}


export default UnexpectedEventError;
