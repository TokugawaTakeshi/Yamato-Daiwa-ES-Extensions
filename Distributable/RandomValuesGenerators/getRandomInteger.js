"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRandomInteger({ minimalValue, maximalValue }) {
    return Math.floor((Math.random() * (maximalValue - minimalValue + 1)) + minimalValue);
}
exports.default = getRandomInteger;
