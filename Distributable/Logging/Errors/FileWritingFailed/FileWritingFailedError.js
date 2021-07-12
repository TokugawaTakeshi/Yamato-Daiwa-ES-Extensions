"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileWritingFailedErrorLocalization__English_1 = require("./FileWritingFailedErrorLocalization__English");
class FileWritingFailedError extends Error {
    constructor(parametersObject) {
        super();
        this.name = FileWritingFailedError.NAME;
        if ("customMessage" in parametersObject) {
            this.message = parametersObject.customMessage;
        }
        else {
            this.message = FileWritingFailedError.localization.genericDescriptionPartTemplate(parametersObject);
        }
    }
    static get DEFAULT_TITLE() {
        return FileWritingFailedError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        FileWritingFailedError.localization = localization;
    }
}
FileWritingFailedError.NAME = "FileWritingFailedError";
FileWritingFailedError.localization = FileWritingFailedErrorLocalization__English_1.default;
exports.default = FileWritingFailedError;
