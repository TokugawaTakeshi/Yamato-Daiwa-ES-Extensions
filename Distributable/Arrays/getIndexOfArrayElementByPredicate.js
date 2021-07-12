"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getIndexOfArrayElementByPredicate(targetArray, predicate) {
    for (const [index, element] of targetArray.entries()) {
        if (predicate(element)) {
            return index;
        }
    }
    return null;
}
exports.default = getIndexOfArrayElementByPredicate;
