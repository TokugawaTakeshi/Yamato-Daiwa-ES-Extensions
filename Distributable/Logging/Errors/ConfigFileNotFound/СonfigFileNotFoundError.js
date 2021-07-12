"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigFileNotFoundErrorLocalization__English_1 = require("./ConfigFileNotFoundErrorLocalization__English");
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
ConfigFileNotFoundError.localization = ConfigFileNotFoundErrorLocalization__English_1.default;
exports.default = ConfigFileNotFoundError;
