"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNegativeIntegerOrZero(potentialInteger) {
    if (typeof potentialInteger !== "number") {
        return false;
    }
    return Number.isInteger(potentialInteger) && potentialInteger <= 0;
}
exports.default = isNegativeIntegerOrZero;
