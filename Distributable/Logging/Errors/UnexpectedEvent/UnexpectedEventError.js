"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnexpectedEventErrorLocalization__English_1 = require("./UnexpectedEventErrorLocalization__English");
class UnexpectedEventError extends Error {
    constructor(message) {
        super();
        this.name = UnexpectedEventError.NAME;
        this.message = message;
    }
    static get DEFAULT_TITLE() {
        return UnexpectedEventError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        UnexpectedEventError.localization = localization;
    }
}
UnexpectedEventError.NAME = "UnexpectedEventError";
UnexpectedEventError.localization = UnexpectedEventErrorLocalization__English_1.default;
exports.default = UnexpectedEventError;
