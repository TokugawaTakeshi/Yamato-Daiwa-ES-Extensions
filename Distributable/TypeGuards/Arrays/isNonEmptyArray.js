"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNonEmptyArray(potentialArray) {
    if (!Array.isArray(potentialArray)) {
        return false;
    }
    return potentialArray.length > 0;
}
exports.default = isNonEmptyArray;
