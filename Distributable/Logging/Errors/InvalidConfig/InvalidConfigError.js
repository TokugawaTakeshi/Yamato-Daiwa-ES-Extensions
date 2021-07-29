import InvalidConfigErrorLocalization__Japanese from "./InvalidConfigErrorLocalization__English";
class InvalidConfigError extends Error {
    constructor(parametersObject) {
        super();
        this.name = InvalidConfigError.NAME;
        if ("customMessage" in parametersObject) {
            this.message = parametersObject.customMessage;
        }
        else {
            this.message = InvalidConfigError.localization.genericDescriptionPartTemplate(parametersObject);
        }
    }
    static get DEFAULT_TITLE() {
        return InvalidConfigError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        InvalidConfigError.localization = localization;
    }
}
InvalidConfigError.NAME = "InvalidConfigError";
InvalidConfigError.localization = InvalidConfigErrorLocalization__Japanese;
export default InvalidConfigError;
