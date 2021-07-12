"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidConfigErrorLocalization__English_1 = require("./InvalidConfigErrorLocalization__English");
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
InvalidConfigError.localization = InvalidConfigErrorLocalization__English_1.default;
exports.default = InvalidConfigError;
