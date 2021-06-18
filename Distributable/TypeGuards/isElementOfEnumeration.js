"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isElementOfEnumeration(possibleEnumerationElement, targetEnumeration) {
    for (const element of Object.values(targetEnumeration)) {
        if (element === possibleEnumerationElement) {
            return true;
        }
    }
    return false;
}
exports.default = isElementOfEnumeration;
