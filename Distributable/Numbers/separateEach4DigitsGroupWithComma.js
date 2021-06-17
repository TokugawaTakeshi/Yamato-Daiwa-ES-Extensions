"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function separateEach4DigitsGroupWithComma(targetNumber) {
    return String(targetNumber).replace(/\B(?=(?:\d{4})+(?!\d))/gu, ",");
}
exports.default = separateEach4DigitsGroupWithComma;
