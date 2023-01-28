export default function addMultiplePairsToMap<Key, Value>(
  targetMap: Map<Key, Value>,
  newPairs: ReadonlyMap<Key, Value> | ReadonlyArray<[Key, Value]>
): Map<Key, Value> {

  for (const [ key, value ] of newPairs) {
    targetMap.set(key, value);
  }

  return targetMap;

}
