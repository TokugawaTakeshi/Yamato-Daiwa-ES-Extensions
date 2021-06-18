"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNeitherUndefinedNorNull(targetValue) {
    return typeof targetValue !== "undefined" && targetValue !== null;
}
exports.default = isNeitherUndefinedNorNull;
