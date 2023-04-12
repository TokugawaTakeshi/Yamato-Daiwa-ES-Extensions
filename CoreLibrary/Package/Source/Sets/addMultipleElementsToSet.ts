export default function addMultipleElementsToSet<SetElement>(
  targetSet: Set<SetElement>,
  newElements: ReadonlyArray<SetElement>
): Set<SetElement> {

  newElements.forEach((newElement: SetElement): void => {
    targetSet.add(newElement);
  });

  return targetSet;

}
