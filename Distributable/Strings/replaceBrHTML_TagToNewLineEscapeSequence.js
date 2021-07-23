"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function replaceBrHTML_TagToNewLineEscapeSequence(targetString) {
    return targetString.replace(/<br\s*\/*>/gu, "\n");
}
exports.default = replaceBrHTML_TagToNewLineEscapeSequence;
