export default function mergeSets<Element>(...targetSets: ReadonlyArray<ReadonlySet<Element>>): Set<Element> {

  const outputSet: Set<Element> = new Set();

  for (const targetSet of targetSets) {
    for (const element of targetSet) {
      outputSet.add(element);
    }
  }

  return outputSet;

}
