import CrossBrowserIssueErrorLocalization__English from "./CrossBrowserIssueErrorLocalization__English";


class CrossBrowserIssueError extends Error {

  public static readonly NAME: string = "CrossBrowserIssueError";
  public static get DEFAULT_TITLE(): string {
    return CrossBrowserIssueError.localization.defaultTitle;
  }

  private static localization: CrossBrowserIssueError.Localization = CrossBrowserIssueErrorLocalization__English;


  public static setLocalization(localization: CrossBrowserIssueError.Localization): void {
    CrossBrowserIssueError.localization = localization;
  }


  public constructor(message: string) {

    super();

    this.name = CrossBrowserIssueError.NAME;
    this.message = message;
  }
}


namespace CrossBrowserIssueError {
  export type Localization = {
    readonly defaultTitle: string;
  };
}


export default CrossBrowserIssueError;
