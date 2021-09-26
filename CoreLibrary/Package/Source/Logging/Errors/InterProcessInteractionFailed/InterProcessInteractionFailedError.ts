import InterProcessInteractionFailedErrorLocalization__English
  from "./InterProcessInteractionFailedErrorLocalization__English";


class InterProcessInteractionFailedError extends Error {

  public static readonly NAME: string = "InterProcessInteractionFailedError";
  public static get DEFAULT_TITLE(): string {
    return InterProcessInteractionFailedError.localization.defaultTitle;
  }

  private static localization: InterProcessInteractionFailedError.Localization =
      InterProcessInteractionFailedErrorLocalization__English;


  public static setLocalization(localization: InterProcessInteractionFailedError.Localization): void {
    InterProcessInteractionFailedError.localization = localization;
  }


  public constructor(message: string) {

    super();

    this.name = InterProcessInteractionFailedError.NAME;
    this.message = message;
  }
}


namespace InterProcessInteractionFailedError {
  export type Localization = {
    readonly defaultTitle: string;
  };
}


export default InterProcessInteractionFailedError;
