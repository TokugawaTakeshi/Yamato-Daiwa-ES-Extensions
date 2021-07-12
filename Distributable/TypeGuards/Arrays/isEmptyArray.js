"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEmptyArray(potentialArray) {
    return Array.isArray(potentialArray) && potentialArray.length === 0;
}
exports.default = isEmptyArray;
