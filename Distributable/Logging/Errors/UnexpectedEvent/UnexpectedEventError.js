import UnexpectedEventErrorLocalization__English from "./UnexpectedEventErrorLocalization__English";
class UnexpectedEventError extends Error {
    constructor(message) {
        super();
        this.name = UnexpectedEventError.NAME;
        this.message = message;
    }
    static get DEFAULT_TITLE() {
        return UnexpectedEventError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        UnexpectedEventError.localization = localization;
    }
}
UnexpectedEventError.NAME = "UnexpectedEventError";
UnexpectedEventError.localization = UnexpectedEventErrorLocalization__English;
export default UnexpectedEventError;
