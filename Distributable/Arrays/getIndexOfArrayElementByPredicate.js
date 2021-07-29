export default function getIndexOfArrayElementByPredicate(targetArray, predicate) {
    for (const [index, element] of targetArray.entries()) {
        if (predicate(element)) {
            return index;
        }
    }
    return null;
}
