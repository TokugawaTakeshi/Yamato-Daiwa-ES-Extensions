"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNonEmptyString(potentialString) {
    return typeof potentialString === "string" && potentialString.length > 0;
}
exports.default = isNonEmptyString;
