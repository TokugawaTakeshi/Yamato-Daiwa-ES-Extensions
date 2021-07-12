"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function undefinedToEmptyString(targetValue) {
    return typeof targetValue === "string" && targetValue.length > 0 ? targetValue : "";
}
exports.default = undefinedToEmptyString;
