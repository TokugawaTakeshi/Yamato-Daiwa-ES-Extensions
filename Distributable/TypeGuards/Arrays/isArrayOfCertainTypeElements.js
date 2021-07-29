export default function isArrayOfCertainTypeElements(potentialArray, elementTypeGuard) {
    if (!Array.isArray(potentialArray)) {
        return false;
    }
    for (const arrayElement of potentialArray) {
        if (!elementTypeGuard(arrayElement)) {
            return false;
        }
    }
    return true;
}
