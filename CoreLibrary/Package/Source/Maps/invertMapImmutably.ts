export default function invertMapImmutably<Key, Value>(initialMap: ReadonlyMap<Key, Value>): Map<Value, Key> {
  return new Map(
    Array.from(initialMap, ([ key, value ]: [Key, Value]): [Value, Key] => [ value, key ])
  );
}
