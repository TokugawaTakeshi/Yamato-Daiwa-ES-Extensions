"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRandomInteger_1 = require("./getRandomInteger");
const getRandomBoolean_1 = require("./getRandomBoolean");
function getRandomLatinSymbol({ capital = false, lowercase = false } = {}) {
    const latinSymbols = "abcdefghijklmnopqrstuvwxyz";
    const randomLatinSymbol = latinSymbols[getRandomInteger_1.default({
        minimalValue: 0,
        maximalValue: latinSymbols.length - 1
    })];
    if (capital) {
        return randomLatinSymbol.toUpperCase();
    }
    else if (lowercase) {
        return randomLatinSymbol;
    }
    return getRandomBoolean_1.default() ? randomLatinSymbol : randomLatinSymbol.toUpperCase();
}
exports.default = getRandomLatinSymbol;
