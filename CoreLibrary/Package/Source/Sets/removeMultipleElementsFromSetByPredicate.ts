export default function removeMultipleElementsFromSetByPredicate<ElementType>(
  {
    targetSet,
    predicate,
    mutably = false
  }: Readonly<{
    targetSet: Set<ElementType>;
    predicate: (element: ElementType) => boolean;
    mutably?: boolean;
  }>
): Readonly<{
  updatedSet: Set<ElementType>;
  removedElements: Array<ElementType>;
}> {

  const removedElements: Array<ElementType> = [];

  const workpiece: Set<ElementType> = mutably ? targetSet : new Set<ElementType>(targetSet);

  for (const element of workpiece) {
    if (predicate(element)) {
      workpiece.delete(element);
      removedElements.push(element);
    }
  }

  return {
    updatedSet: workpiece,
    removedElements
  };

}
