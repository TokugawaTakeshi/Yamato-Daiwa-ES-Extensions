"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileReadingFailedErrorLocalization__English_1 = require("./FileReadingFailedErrorLocalization__English");
class FileReadingFailedError extends Error {
    constructor(parametersObject) {
        super();
        this.name = FileReadingFailedError.NAME;
        if ("customMessage" in parametersObject) {
            this.message = parametersObject.customMessage;
        }
        else {
            this.message = FileReadingFailedError.localization.genericDescriptionPartTemplate(parametersObject);
        }
    }
    static get DEFAULT_TITLE() {
        return FileReadingFailedError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        FileReadingFailedError.localization = localization;
    }
}
FileReadingFailedError.NAME = "FileReadingFailure";
FileReadingFailedError.localization = FileReadingFailedErrorLocalization__English_1.default;
exports.default = FileReadingFailedError;
