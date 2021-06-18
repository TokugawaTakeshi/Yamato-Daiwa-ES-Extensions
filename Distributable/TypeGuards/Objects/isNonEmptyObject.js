"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNonEmptyObject(potentialObject) {
    if (typeof potentialObject !== "object" || potentialObject === null) {
        return false;
    }
    return Object.entries(potentialObject).length > 0;
}
exports.default = isNonEmptyObject;
