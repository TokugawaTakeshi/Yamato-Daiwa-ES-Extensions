export namespace RemovingSetElementsByPredicates {

  export type Result<SetElement> = Readonly<{
    updatedSet: Set<SetElement>;
    removedElements: Set<SetElement>;
  }>;

}


export function removeSetElementsByPredicates<SetElement>(
  {
    targetSet,
    mutably,
    ...sourceDataAndOptions
  }: Readonly<
    (
      {
        mutably?: true;
        targetSet: Set<SetElement>;
      } |
      {
        mutably: false;
        targetSet: ReadonlySet<SetElement>;
      }
    ) &
    (
      { predicate: (arrayElement: SetElement) => boolean; } |
      { predicates: ReadonlyArray<(arrayElement: SetElement) => boolean>; }
    )
  >
): RemovingSetElementsByPredicates.Result<SetElement> {

  const workpiece: Set<SetElement> = mutably === false ? new Set<SetElement>(targetSet) : targetSet;
  const removedElements: Set<SetElement> = new Set();

  for (
    const predicate of [
      ..."predicates" in sourceDataAndOptions ? sourceDataAndOptions.predicates : [ sourceDataAndOptions.predicate ]
    ]
  ) {
    for (const element of workpiece) {
      if (predicate(element)) {
        workpiece.delete(element);
        removedElements.add(element);
      }
    }
  }

  return {
    updatedSet: workpiece,
    removedElements
  };

}
