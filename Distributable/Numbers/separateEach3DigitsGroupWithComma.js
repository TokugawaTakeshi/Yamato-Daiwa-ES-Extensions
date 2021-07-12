"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function separateEach3DigitsGroupWithComma(targetNumber) {
    return String(targetNumber).replace(/\B(?=(?:\d{3})+(?!\d))/gu, ",");
}
exports.default = separateEach3DigitsGroupWithComma;
