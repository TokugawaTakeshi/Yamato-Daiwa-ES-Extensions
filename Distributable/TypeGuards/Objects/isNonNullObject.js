"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNonNullObject(potentialObject) {
    return typeof potentialObject === "object" && potentialObject !== null;
}
exports.default = isNonNullObject;
