import InvalidParameterValueErrorLocalization__English from "./InvalidParameterValueErrorLocalization__English";
class InvalidParameterValueError extends Error {
    constructor(parametersObject) {
        super();
        this.name = InvalidParameterValueError.NAME;
        if ("customMessage" in parametersObject) {
            this.message = parametersObject.customMessage;
        }
        else {
            this.message = InvalidParameterValueError.localization.genericDescriptionPartTemplate(parametersObject);
        }
    }
    static get DEFAULT_TITLE() {
        return InvalidParameterValueError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        InvalidParameterValueError.localization = localization;
    }
}
InvalidParameterValueError.NAME = "InvalidParameterValueError";
InvalidParameterValueError.localization = InvalidParameterValueErrorLocalization__English;
export default InvalidParameterValueError;
