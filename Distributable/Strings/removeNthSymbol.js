"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeNthSymbol(targetString, options) {
    const charactersSequence = Array.from(targetString);
    if (options.numerationFrom === 0) {
        charactersSequence.splice(options.targetSymbolNumber, 1);
    }
    else {
        charactersSequence.splice(options.targetSymbolNumber - 1, 1);
    }
    return charactersSequence.join("");
}
exports.default = removeNthSymbol;
