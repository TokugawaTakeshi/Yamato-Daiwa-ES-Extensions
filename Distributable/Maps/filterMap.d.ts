export default function filterMap<Key, Value>(targetMap: Map<Key, Value>, filteringPredicate: (key: Key, Value: Value) => boolean): Map<Key, Value>;
