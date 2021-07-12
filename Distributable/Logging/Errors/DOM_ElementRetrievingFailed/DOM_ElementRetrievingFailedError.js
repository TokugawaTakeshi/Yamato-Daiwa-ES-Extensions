"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DOM_ElementRetrievingFailedErrorLocalization__English_1 = require("./DOM_ElementRetrievingFailedErrorLocalization__English");
class DOM_ElementRetrievingFailedError extends Error {
    constructor(parametersObject) {
        super();
        this.name = DOM_ElementRetrievingFailedError.NAME;
        if ("customMessage" in parametersObject) {
            this.message = parametersObject.customMessage;
        }
        else {
            this.message = DOM_ElementRetrievingFailedError.localization.genericDescriptionPartTemplate(parametersObject);
        }
    }
    static get DEFAULT_TITLE() {
        return DOM_ElementRetrievingFailedError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        DOM_ElementRetrievingFailedError.localization = localization;
    }
}
DOM_ElementRetrievingFailedError.NAME = "DOM_ElementRetrievingFailedError";
DOM_ElementRetrievingFailedError.localization = DOM_ElementRetrievingFailedErrorLocalization__English_1.default;
exports.default = DOM_ElementRetrievingFailedError;
