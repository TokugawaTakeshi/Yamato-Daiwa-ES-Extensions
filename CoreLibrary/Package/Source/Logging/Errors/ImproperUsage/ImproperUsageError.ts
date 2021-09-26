import ImproperUsageErrorLocalization__English from "./ImproperUsageErrorLocalization__English";


class ImproperUsageError extends Error {

  public static readonly NAME: string = "ImproperUsageError";
  public static get DEFAULT_TITLE(): string {
    return ImproperUsageError.localization.defaultTitle;
  }

  private static localization: ImproperUsageError.Localization = ImproperUsageErrorLocalization__English;


  public static setLocalization(localization: ImproperUsageError.Localization): void {
    ImproperUsageError.localization = localization;
  }


  public constructor(message: string) {

    super();

    this.name = ImproperUsageError.NAME;
    this.message = message;
  }
}


namespace ImproperUsageError {
  export type Localization = {
    readonly defaultTitle: string;
  };
}


export default ImproperUsageError;
