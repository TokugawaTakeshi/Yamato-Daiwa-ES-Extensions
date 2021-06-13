"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNegativeInteger(potentialInteger) {
    if (typeof potentialInteger !== "number") {
        return false;
    }
    return Number.isInteger(potentialInteger) && potentialInteger < 0;
}
exports.default = isNegativeInteger;
