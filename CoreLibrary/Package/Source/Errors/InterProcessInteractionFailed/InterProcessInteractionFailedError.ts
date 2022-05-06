import InterProcessInteractionFailedErrorLocalization__English
  from "./InterProcessInteractionFailedErrorLocalization.english";


class InterProcessInteractionFailedError extends Error {

  public static readonly NAME: string = "InterProcessInteractionFailedError";
  public static localization: InterProcessInteractionFailedError.Localization =
      InterProcessInteractionFailedErrorLocalization__English;


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
