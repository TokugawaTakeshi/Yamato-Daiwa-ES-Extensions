export default function getOneEntryOfMap<Key, Value>(targetMap: ReadonlyMap<Key, Value>): [ Key, Value ] {
  return Array.from(targetMap.entries())[0];
}
