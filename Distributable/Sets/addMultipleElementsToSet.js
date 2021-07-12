"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addMultipleElementsToSet(targetSet, newElements) {
    newElements.forEach((newElement) => {
        targetSet.add(newElement);
    });
    return targetSet;
}
exports.default = addMultipleElementsToSet;
