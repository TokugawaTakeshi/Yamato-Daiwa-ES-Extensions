export default function createSetBasedOnOtherSet<BasicSetElement, NewSetElement>(
  targetSet: ReadonlySet<BasicSetElement>, elementTransformer: (basicSetElement: BasicSetElement) => NewSetElement
): Set<NewSetElement> {
  return new Set(Array.from(targetSet).map(elementTransformer));
}
