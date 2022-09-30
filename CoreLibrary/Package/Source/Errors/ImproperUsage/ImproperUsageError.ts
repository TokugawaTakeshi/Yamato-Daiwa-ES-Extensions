import ImproperUsageErrorLocalization__English from "./ImproperUsageErrorLocalization.english";


class ImproperUsageError extends Error {

  public static readonly NAME: string = "ImproperUsageError";
  public static localization: ImproperUsageError.Localization = ImproperUsageErrorLocalization__English;


  public constructor(message: string) {

    super();

    this.name = ImproperUsageError.NAME;
    this.message = message;
  }
}


namespace ImproperUsageError {
  export type Localization = Readonly<{ defaultTitle: string; }>;
}


export default ImproperUsageError;
