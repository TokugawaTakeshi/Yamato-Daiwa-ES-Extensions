"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function substituteWhenNull(targetValue, defaultValue) {
    return targetValue === null ? defaultValue : targetValue;
}
exports.default = substituteWhenNull;
