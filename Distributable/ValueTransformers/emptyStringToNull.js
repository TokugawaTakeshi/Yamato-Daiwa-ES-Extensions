"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function emptyStringToNull(targetValue) {
    return targetValue.length > 0 ? targetValue : null;
}
exports.default = emptyStringToNull;
