import AlgorithmMismatchErrorLocalization__English from "./AlgorithmMismatchErrorLocalization.english";


class AlgorithmMismatchError extends Error {

  public static readonly NAME: string = "AlgorithmMismatchError";
  public static localization: AlgorithmMismatchError.Localization = AlgorithmMismatchErrorLocalization__English;


  public constructor(message: string) {

    super();

    this.name = AlgorithmMismatchError.NAME;
    this.message = message;
  }
}


namespace AlgorithmMismatchError {
  export type Localization = Readonly<{ defaultTitle: string; }>;
}


export default AlgorithmMismatchError;
