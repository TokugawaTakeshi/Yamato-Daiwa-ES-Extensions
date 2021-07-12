"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function areStringifiedDigitsOnly(potentialStringifiedDigits) {
    return /^[0-9]+$/u.test(potentialStringifiedDigits);
}
exports.default = areStringifiedDigitsOnly;
