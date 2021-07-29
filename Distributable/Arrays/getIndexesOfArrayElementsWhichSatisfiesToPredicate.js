export default function getIndexesOfArrayElementsWhichSatisfiesToPredicate(targetArray, predicate) {
    const indexesOfElementsWhichSatisfiesToPredicate = [];
    targetArray.forEach((arrayElement, index) => {
        if (predicate(arrayElement)) {
            indexesOfElementsWhichSatisfiesToPredicate.push(index);
        }
    });
    return indexesOfElementsWhichSatisfiesToPredicate;
}
