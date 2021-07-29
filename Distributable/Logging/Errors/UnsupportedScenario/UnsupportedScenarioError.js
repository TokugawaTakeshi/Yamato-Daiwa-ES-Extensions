import UnsupportedScenarioErrorLocalization__English from "./UnsupportedScenarioErrorLocalization__English";
class UnsupportedScenarioError extends Error {
    constructor(message) {
        super();
        this.name = UnsupportedScenarioError.NAME;
        this.message = message;
    }
    static get DEFAULT_TITLE() {
        return UnsupportedScenarioError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        UnsupportedScenarioError.localization = localization;
    }
}
UnsupportedScenarioError.NAME = "UnsupportedScenarioError";
UnsupportedScenarioError.localization = UnsupportedScenarioErrorLocalization__English;
export default UnsupportedScenarioError;
