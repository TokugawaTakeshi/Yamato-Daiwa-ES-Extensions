import ConfigFileNotFoundErrorLocalization__English from "./ConfigFileNotFoundErrorLocalization__English";
class ConfigFileNotFoundError extends Error {
    constructor(parametersObject) {
        super();
        this.name = ConfigFileNotFoundError.NAME;
        if ("customMessage" in parametersObject) {
            this.message = parametersObject.customMessage;
        }
        else {
            this.message = ConfigFileNotFoundError.localization.genericDescriptionPartTemplate(parametersObject);
        }
    }
    static get DEFAULT_TITLE() {
        return ConfigFileNotFoundError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        ConfigFileNotFoundError.localization = localization;
    }
}
ConfigFileNotFoundError.NAME = "ConfigFileNotFoundError";
ConfigFileNotFoundError.localization = ConfigFileNotFoundErrorLocalization__English;
export default ConfigFileNotFoundError;
