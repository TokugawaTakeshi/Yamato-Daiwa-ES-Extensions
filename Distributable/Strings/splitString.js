"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function splitString(targetString, separator) {
    if (separator === "") {
        return Array.from(targetString);
    }
    return targetString.split(separator);
}
exports.default = splitString;
