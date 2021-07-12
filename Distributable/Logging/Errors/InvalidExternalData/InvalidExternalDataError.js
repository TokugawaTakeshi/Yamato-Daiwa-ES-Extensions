"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidExternalDataErrorLocalization__English_1 = require("./InvalidExternalDataErrorLocalization__English");
class InvalidExternalDataError extends Error {
    constructor(parametersObject) {
        super();
        this.name = InvalidExternalDataError.NAME;
        if ("customMessage" in parametersObject) {
            this.message = parametersObject.customMessage;
        }
        else {
            this.message = InvalidExternalDataError.localization.genericDescriptionPartTemplate(parametersObject);
        }
    }
    static get DEFAULT_TITLE() {
        return InvalidExternalDataError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        InvalidExternalDataError.localization = localization;
    }
}
InvalidExternalDataError.NAME = "InvalidExternalDataError";
InvalidExternalDataError.localization = InvalidExternalDataErrorLocalization__English_1.default;
exports.default = InvalidExternalDataError;
