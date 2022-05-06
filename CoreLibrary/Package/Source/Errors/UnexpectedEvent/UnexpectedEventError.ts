import UnexpectedEventErrorLocalization__English from "./UnexpectedEventErrorLocalization.english";


class UnexpectedEventError extends Error {

  public static readonly NAME: string = "UnexpectedEventError";
  public static localization: UnexpectedEventError.Localization = UnexpectedEventErrorLocalization__English;


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
