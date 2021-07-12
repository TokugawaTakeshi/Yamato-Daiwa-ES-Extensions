declare class CrossBrowserIssueError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: CrossBrowserIssueError.Localization): void;
    constructor(message: string);
}
declare namespace CrossBrowserIssueError {
    type Localization = {
        readonly defaultTitle: string;
    };
}
export default CrossBrowserIssueError;
