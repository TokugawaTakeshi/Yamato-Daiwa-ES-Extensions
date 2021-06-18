"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEmptyString(potentialString) {
    return typeof potentialString === "string" && potentialString.length === 0;
}
exports.default = isEmptyString;
