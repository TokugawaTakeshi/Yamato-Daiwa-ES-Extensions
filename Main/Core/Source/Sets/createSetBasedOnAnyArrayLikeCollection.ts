export default function createSetBasedOnAnyArrayLikeCollection<BasicSetElement, NewSetElement>(
  targetIterable: ArrayLike<BasicSetElement> | ReadonlyArray<BasicSetElement> | ReadonlySet<BasicSetElement>,
  elementTransformer: (basicSetElement: BasicSetElement) => NewSetElement
): Set<NewSetElement> {
  return new Set(Array.from(targetIterable).map(elementTransformer));
}
