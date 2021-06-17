"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function reverseString(targetString) {
    return targetString.
        split("").
        reverse().
        join("");
}
exports.default = reverseString;
