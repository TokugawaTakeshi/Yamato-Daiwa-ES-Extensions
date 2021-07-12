"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AlgorithmMismatchErrorLocalization__English_1 = require("./AlgorithmMismatchErrorLocalization__English");
class AlgorithmMismatchError extends Error {
    constructor(message) {
        super();
        this.name = AlgorithmMismatchError.NAME;
        this.message = message;
    }
    static get DEFAULT_TITLE() {
        return AlgorithmMismatchError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        AlgorithmMismatchError.localization = localization;
    }
}
AlgorithmMismatchError.NAME = "AlgorithmMismatchError";
AlgorithmMismatchError.localization = AlgorithmMismatchErrorLocalization__English_1.default;
exports.default = AlgorithmMismatchError;
