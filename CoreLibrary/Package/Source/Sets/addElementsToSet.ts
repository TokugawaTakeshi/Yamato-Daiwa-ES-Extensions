export default function addElementsToSet<SetElement>(
  {
    targetSet,
    newElements,
    mutably
  }: Readonly<
    {
      newElements: ReadonlyArray<SetElement> | ReadonlySet<SetElement>;
    } &
    (
      {
        mutably?: true;
        targetSet: Set<SetElement>;
      } |
      {
        mutably: false;
        targetSet: ReadonlySet<SetElement>;
      }
    )
  >
): Set<SetElement> {

  const workpiece: Set<SetElement> = mutably === true ? targetSet : new Set(targetSet);

  for (const element of newElements) {
    workpiece.add(element);
  }

  return workpiece;

}
