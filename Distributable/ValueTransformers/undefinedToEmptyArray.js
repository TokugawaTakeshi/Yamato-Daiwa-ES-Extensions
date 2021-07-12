"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function undefinedToEmptyArray(targetValue) {
    return typeof targetValue === "undefined" ? [] : targetValue;
}
exports.default = undefinedToEmptyArray;
