import IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English from "./IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English";
class IncompatiblePropertiesInObjectTypeParameterError extends Error {
    constructor(parametersObject) {
        super();
        this.name = IncompatiblePropertiesInObjectTypeParameterError.NAME;
        if ("customMessage" in parametersObject) {
            this.message = parametersObject.customMessage;
        }
        else {
            this.message = IncompatiblePropertiesInObjectTypeParameterError.localization.genericDescriptionPartTemplate(parametersObject);
        }
    }
    static get DEFAULT_TITLE() {
        return IncompatiblePropertiesInObjectTypeParameterError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        IncompatiblePropertiesInObjectTypeParameterError.localization = localization;
    }
}
IncompatiblePropertiesInObjectTypeParameterError.NAME = "IncompatiblePropertiesError";
IncompatiblePropertiesInObjectTypeParameterError.localization = IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English;
export default IncompatiblePropertiesInObjectTypeParameterError;
