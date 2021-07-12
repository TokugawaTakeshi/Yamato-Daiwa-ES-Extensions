"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSpecificBooleanValueWithProbability({ value, probability__percents }) {
    if (value) {
        return Math.random() < (probability__percents / 100);
    }
    return Math.random() >= (probability__percents / 100);
}
exports.default = getSpecificBooleanValueWithProbability;
