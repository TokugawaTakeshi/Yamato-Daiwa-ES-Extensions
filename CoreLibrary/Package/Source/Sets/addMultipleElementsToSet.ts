export default function addMultipleElementsToSet<SetElement>(
  targetSet: Set<SetElement>,
  newElements: Array<SetElement>
): Set<SetElement> {

  newElements.forEach((newElement: SetElement): void => {
    targetSet.add(newElement);
  });

  return targetSet;
}
