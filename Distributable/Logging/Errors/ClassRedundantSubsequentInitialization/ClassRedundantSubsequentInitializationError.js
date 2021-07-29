import ClassRedundantSubsequentInitializationErrorLocalization__English from "./ClassRedundantSubsequentInitializationErrorLocalization__English";
class ClassRedundantSubsequentInitializationError extends Error {
    constructor(parametersObject) {
        super();
        this.name = ClassRedundantSubsequentInitializationError.NAME;
        if ("customMessage" in parametersObject) {
            this.message = parametersObject.customMessage;
        }
        else {
            this.message = ClassRedundantSubsequentInitializationError.localization.genericDescriptionPartTemplate(parametersObject);
        }
    }
    static get DEFAULT_TITLE() {
        return ClassRedundantSubsequentInitializationError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        ClassRedundantSubsequentInitializationError.localization = localization;
    }
}
ClassRedundantSubsequentInitializationError.NAME = "RedundantSubsequentClassInitializationError";
ClassRedundantSubsequentInitializationError.localization = ClassRedundantSubsequentInitializationErrorLocalization__English;
export default ClassRedundantSubsequentInitializationError;
