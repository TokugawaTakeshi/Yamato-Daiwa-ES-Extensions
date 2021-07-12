"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRandomInteger_1 = require("./getRandomInteger");
function getRandomArrayElement(targetArray) {
    return targetArray[getRandomInteger_1.default({
        minimalValue: 0,
        maximalValue: targetArray.length - 1
    })];
}
exports.default = getRandomArrayElement;
