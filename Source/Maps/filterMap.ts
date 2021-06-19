export default function filterMap<Key, Value>(
    targetMap: Map<Key, Value>, filteringPredicate: (key: Key, Value: Value) => boolean
): Map<Key, Value> {

  const filteredMap: Map<Key, Value> = new Map<Key, Value>();

  targetMap.forEach((value: Value, key: Key): void => {
    if (filteringPredicate(key, value)) {
      filteredMap.set(key, value);
    }
  });

  return filteredMap;
}
