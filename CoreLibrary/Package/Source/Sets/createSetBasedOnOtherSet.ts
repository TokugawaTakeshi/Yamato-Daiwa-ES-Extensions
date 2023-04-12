export default function createSetBasedOnOtherSet<BasicSetElement, NewSetElement>(
  targetSet: Set<BasicSetElement>, elementTransformer: (basicSetElement: BasicSetElement) => NewSetElement
): Set<NewSetElement> {
  return new Set(Array.from(targetSet).map(elementTransformer));
}
