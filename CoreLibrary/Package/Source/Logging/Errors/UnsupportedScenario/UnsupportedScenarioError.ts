import UnsupportedScenarioErrorLocalization__English
  from "./UnsupportedScenarioErrorLocalization__English";


class UnsupportedScenarioError extends Error {

  public static readonly NAME: string = "UnsupportedScenarioError";
  public static get DEFAULT_TITLE(): string {
    return UnsupportedScenarioError.localization.defaultTitle;
  }

  private static localization: UnsupportedScenarioError.Localization = UnsupportedScenarioErrorLocalization__English;


  public static setLocalization(localization: UnsupportedScenarioError.Localization): void {
    UnsupportedScenarioError.localization = localization;
  }


  public constructor(message: string) {

    super();

    this.name = UnsupportedScenarioError.NAME;
    this.message = message;
  }
}


namespace UnsupportedScenarioError {
  export type Localization = {
    readonly defaultTitle: string;
  };
}


export default UnsupportedScenarioError;
