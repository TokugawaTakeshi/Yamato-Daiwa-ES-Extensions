"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isArrayOfLength(potentialArray, expectedLength) {
    if (!Array.isArray(potentialArray)) {
        return false;
    }
    return potentialArray.length === expectedLength;
}
exports.default = isArrayOfLength;
