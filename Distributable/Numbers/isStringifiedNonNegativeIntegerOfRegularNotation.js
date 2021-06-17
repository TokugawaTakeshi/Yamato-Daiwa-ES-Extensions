"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isStringifiedNonNegativeIntegerOfRegularNotation(value) {
    return /^[1-9][0-9]*$/u.test(value);
}
exports.default = isStringifiedNonNegativeIntegerOfRegularNotation;
