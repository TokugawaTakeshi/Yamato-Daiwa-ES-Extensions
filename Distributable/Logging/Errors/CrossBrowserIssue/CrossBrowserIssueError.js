import CrossBrowserIssueErrorLocalization__English from "./CrossBrowserIssueErrorLocalization__English";
class CrossBrowserIssueError extends Error {
    constructor(message) {
        super();
        this.name = CrossBrowserIssueError.NAME;
        this.message = message;
    }
    static get DEFAULT_TITLE() {
        return CrossBrowserIssueError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        CrossBrowserIssueError.localization = localization;
    }
}
CrossBrowserIssueError.NAME = "CrossBrowserIssueError";
CrossBrowserIssueError.localization = CrossBrowserIssueErrorLocalization__English;
export default CrossBrowserIssueError;
