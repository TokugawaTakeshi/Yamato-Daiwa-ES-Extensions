"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEmptyObject(potentialObject) {
    if (typeof potentialObject !== "object" || potentialObject === null) {
        return false;
    }
    return Object.entries(potentialObject).length === 0;
}
exports.default = isEmptyObject;
