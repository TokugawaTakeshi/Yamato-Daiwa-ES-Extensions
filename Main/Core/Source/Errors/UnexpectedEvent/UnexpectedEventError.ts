import unexpectedEventErrorLocalization__english from "./UnexpectedEventErrorLocalization.english";


class UnexpectedEventError extends Error {

  public static readonly NAME: string = "UnexpectedEventError";

  public static localization: UnexpectedEventError.Localization = unexpectedEventErrorLocalization__english;


  public constructor(message: string) {

    super();

    this.name = UnexpectedEventError.NAME;
    this.message = message;

  }

}


namespace UnexpectedEventError {
  export type Localization = Readonly<{ defaultTitle: string; }>;
}


export default UnexpectedEventError;
