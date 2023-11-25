import unsupportedScenarioErrorLocalization__english from "./UnsupportedScenarioErrorLocalization.english";


class UnsupportedScenarioError extends Error {

  public static readonly NAME: string = "UnsupportedScenarioError";

  public static localization: UnsupportedScenarioError.Localization = unsupportedScenarioErrorLocalization__english;


  public constructor(message: string) {

    super();

    this.name = UnsupportedScenarioError.NAME;
    this.message = message;

  }

}


namespace UnsupportedScenarioError {
  export type Localization = Readonly<{ defaultTitle: string; }>;
}


export default UnsupportedScenarioError;
