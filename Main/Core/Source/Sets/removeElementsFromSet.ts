export default function removeElementsFromSet<ElementOfSet>(
  {
    targetSet,
    elementsToDelete,
    mutably
  }: Readonly<
    {
      elementsToDelete: ReadonlyArray<ElementOfSet> | ReadonlySet<ElementOfSet>;
    } &
    (
      {
        mutably?: true;
        targetSet: Set<ElementOfSet>;
      } |
      {
        mutably: false;
        targetSet: ReadonlySet<ElementOfSet>;
      }
    )
  >
): Set<ElementOfSet> {

  const workpiece: Set<ElementOfSet> = mutably === false ? new Set(targetSet) : targetSet;

  for (const element of elementsToDelete) {
    workpiece.delete(element);
  }

  return workpiece;

}
