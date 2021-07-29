import InterProcessInteractionFailedErrorLocalization__English from "./InterProcessInteractionFailedErrorLocalization__English";
class InterProcessInteractionFailedError extends Error {
    constructor(message) {
        super();
        this.name = InterProcessInteractionFailedError.NAME;
        this.message = message;
    }
    static get DEFAULT_TITLE() {
        return InterProcessInteractionFailedError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        InterProcessInteractionFailedError.localization = localization;
    }
}
InterProcessInteractionFailedError.NAME = "InterProcessInteractionFailedError";
InterProcessInteractionFailedError.localization = InterProcessInteractionFailedErrorLocalization__English;
export default InterProcessInteractionFailedError;
