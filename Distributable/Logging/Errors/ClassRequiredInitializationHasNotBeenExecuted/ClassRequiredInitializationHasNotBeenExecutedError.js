"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English_1 = require("./ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English");
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
ClassRequiredInitializationHasNotBeenExecutedError.localization = ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English_1.default;
exports.default = ClassRequiredInitializationHasNotBeenExecutedError;
