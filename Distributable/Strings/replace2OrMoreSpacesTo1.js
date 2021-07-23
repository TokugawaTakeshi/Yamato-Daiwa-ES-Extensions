"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function replace2OrMoreSpacesTo1(targetString) {
    return targetString.replace(/\s{2,}/gmu, " ");
}
exports.default = replace2OrMoreSpacesTo1;
