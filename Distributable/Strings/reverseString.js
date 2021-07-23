"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const splitString_1 = require("./splitString");
function reverseString(targetString) {
    return splitString_1.default(targetString, "").
        reverse().
        join("");
}
exports.default = reverseString;
