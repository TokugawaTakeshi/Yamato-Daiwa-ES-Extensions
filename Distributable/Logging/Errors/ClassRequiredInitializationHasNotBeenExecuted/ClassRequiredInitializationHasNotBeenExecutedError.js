import ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English from "./ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English";
class ClassRequiredInitializationHasNotBeenExecutedError extends Error {
    constructor(parametersObject) {
        super();
        this.name = ClassRequiredInitializationHasNotBeenExecutedError.NAME;
        if ("customMessage" in parametersObject) {
            this.message = parametersObject.customMessage;
        }
        else {
            this.message = ClassRequiredInitializationHasNotBeenExecutedError.localization.genericDescriptionPartTemplate(parametersObject);
        }
    }
    static get DEFAULT_TITLE() {
        return ClassRequiredInitializationHasNotBeenExecutedError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        ClassRequiredInitializationHasNotBeenExecutedError.localization = localization;
    }
}
ClassRequiredInitializationHasNotBeenExecutedError.NAME = "ClassRequiredInitializationHasNotBeenExecutedError";
ClassRequiredInitializationHasNotBeenExecutedError.localization = ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English;
export default ClassRequiredInitializationHasNotBeenExecutedError;
