export default function addEntriesToMap<Key, Value>(
  compoundParameter: Readonly<
    (
      {
        mutably?: true;
        targetMap: Map<Key, Value>;
      } |
      {
        mutably: false;
        targetMap: ReadonlyMap<Key, Value>;
      }
    ) &
    (
      {
        newKey: Key;
        newValue: Value;
      } |
      { newEntries: ReadonlyMap<Key, Value> | ReadonlyArray<[ Key, Value ]>; }
    )
  >
): Map<Key, Value> {

  let newEntries: ReadonlyArray<[ Key, Value ]>;

  if ("newEntries" in compoundParameter) {
    if (compoundParameter.newEntries instanceof Array) {
      newEntries = compoundParameter.newEntries;
    } else {
      newEntries = Array.from(compoundParameter.newEntries.entries());
    }
  } else {
    newEntries = [ [ compoundParameter.newKey, compoundParameter.newValue ] ];
  }

  const workpiece: Map<Key, Value> = compoundParameter.mutably === true ?
      compoundParameter.targetMap : new Map(compoundParameter.targetMap);

  for (const [ key, value ] of newEntries) {
    workpiece.set(key, value);
  }

  return workpiece;

}
