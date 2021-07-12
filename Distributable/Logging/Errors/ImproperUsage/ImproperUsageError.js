"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImproperUsageErrorLocalization__English_1 = require("./ImproperUsageErrorLocalization__English");
class ImproperUsageError extends Error {
    constructor(message) {
        super();
        this.name = ImproperUsageError.NAME;
        this.message = message;
    }
    static get DEFAULT_TITLE() {
        return ImproperUsageError.localization.defaultTitle;
    }
    static setLocalization(localization) {
        ImproperUsageError.localization = localization;
    }
}
ImproperUsageError.NAME = "ImproperUsageError";
ImproperUsageError.localization = ImproperUsageErrorLocalization__English_1.default;
exports.default = ImproperUsageError;
