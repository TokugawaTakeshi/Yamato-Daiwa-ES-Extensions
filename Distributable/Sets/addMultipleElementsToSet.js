export default function addMultipleElementsToSet(targetSet, newElements) {
    newElements.forEach((newElement) => {
        targetSet.add(newElement);
    });
    return targetSet;
}
