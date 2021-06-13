"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isDecimalFractionOfAnySign(potentialDecimalFraction) {
    if (typeof potentialDecimalFraction !== "number") {
        return false;
    }
    return /^-?\d+\.\d+$/u.test(potentialDecimalFraction.toString());
}
exports.default = isDecimalFractionOfAnySign;
