"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getIndexesOfArrayElementsWhichSatisfiesToPredicate(targetArray, predicate) {
    const indexesOfElementsWhichSatisfiesToPredicate = [];
    targetArray.forEach((arrayElement, index) => {
        if (predicate(arrayElement)) {
            indexesOfElementsWhichSatisfiesToPredicate.push(index);
        }
    });
    return indexesOfElementsWhichSatisfiesToPredicate;
}
exports.default = getIndexesOfArrayElementsWhichSatisfiesToPredicate;
