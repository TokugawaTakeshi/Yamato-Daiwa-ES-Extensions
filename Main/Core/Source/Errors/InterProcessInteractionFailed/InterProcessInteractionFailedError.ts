import interProcessInteractionFailedErrorLocalization__english from "./InterProcessInteractionFailedErrorLocalization.english";


class InterProcessInteractionFailedError extends Error {

  public static readonly NAME: string = "InterProcessInteractionFailedError";

  public static localization: InterProcessInteractionFailedError.Localization =
      interProcessInteractionFailedErrorLocalization__english;


  public constructor(message: string) {

    super();

    this.name = InterProcessInteractionFailedError.NAME;
    this.message = message;
  }

}


namespace InterProcessInteractionFailedError {
  export type Localization = Readonly<{ defaultTitle: string; }>;
}


export default InterProcessInteractionFailedError;
