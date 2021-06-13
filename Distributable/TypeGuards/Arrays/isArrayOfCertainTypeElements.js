"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isArrayOfCertainTypeElements(potentialArray, elementTypeGuard) {
    if (!Array.isArray(potentialArray)) {
        return false;
    }
    for (const arrayElement of potentialArray) {
        if (!elementTypeGuard(arrayElement)) {
            return false;
        }
    }
    return true;
}
exports.default = isArrayOfCertainTypeElements;
