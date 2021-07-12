"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function substituteWhenUndefined(targetValue, defaultValue) {
    return typeof targetValue === "undefined" ? defaultValue : targetValue;
}
exports.default = substituteWhenUndefined;
