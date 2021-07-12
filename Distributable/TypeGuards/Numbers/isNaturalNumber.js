"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNaturalNumber(potentialNaturalNumber) {
    if (typeof potentialNaturalNumber !== "number") {
        return false;
    }
    return Number.isInteger(potentialNaturalNumber) && potentialNaturalNumber > 0;
}
exports.default = isNaturalNumber;
