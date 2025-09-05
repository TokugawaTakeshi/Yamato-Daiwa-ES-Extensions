export default function mergeMaps<Key, Value>(...targetMaps: ReadonlyArray<ReadonlyMap<Key, Value>>): Map<Key, Value> {

  const outputMap: Map<Key, Value> = new Map();

  for (const targetMap of targetMaps) {
    for (const [ key, value ] of targetMap.entries()) {
      outputMap.set(key, value);
    }
  }

  return outputMap;

}
