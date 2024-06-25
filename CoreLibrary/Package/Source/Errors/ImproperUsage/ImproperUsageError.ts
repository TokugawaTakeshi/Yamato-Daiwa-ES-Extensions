import improperUsageErrorLocalization__english from "./ImproperUsageErrorLocalization.english";


class ImproperUsageError extends Error {

  public static readonly NAME: string = "ImproperUsageError";

  public static localization: ImproperUsageError.Localization = improperUsageErrorLocalization__english;


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
