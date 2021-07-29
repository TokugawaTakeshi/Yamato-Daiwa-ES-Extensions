import AlgorithmMismatchErrorLocalization__English from "./AlgorithmMismatchErrorLocalization__English";
class AlgorithmMismatchError extends Error {
    constructor(message) {
        super();
        this.name = AlgorithmMismatchError.NAME;
        this.message = message;
    }
    static get DEFAULT_TITLE() {
        return AlgorithmMismatchError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        AlgorithmMismatchError.localization = localization;
    }
}
AlgorithmMismatchError.NAME = "AlgorithmMismatchError";
AlgorithmMismatchError.localization = AlgorithmMismatchErrorLocalization__English;
export default AlgorithmMismatchError;
