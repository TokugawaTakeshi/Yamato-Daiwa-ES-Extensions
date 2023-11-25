import crossBrowserIssueErrorLocalization__english from "./CrossBrowserIssueErrorLocalization.english";


class CrossBrowserIssueError extends Error {

  public static readonly NAME: string = "CrossBrowserIssueError";

  public static localization: CrossBrowserIssueError.Localization = crossBrowserIssueErrorLocalization__english;


  public constructor(message: string) {

    super();

    this.name = CrossBrowserIssueError.NAME;
    this.message = message;

  }

}


namespace CrossBrowserIssueError {
  export type Localization = Readonly<{ defaultTitle: string; }>;
}


export default CrossBrowserIssueError;
