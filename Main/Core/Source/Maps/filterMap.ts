export default function filterMap<Key, Value>(
  {
    targetMap,
    mutably,
    filter
  }: Readonly<
    (
      {
        targetMap: Map<Key, Value>;
        mutably: true;
      } |
      {
        targetMap: ReadonlyMap<Key, Value>;
        mutably: false;
      }
    ) &
    { filter: (key: Key, value: Value) => boolean; }
  >
): Map<Key, Value> {

  const workpiece: Map<Key, Value> = mutably ? targetMap : new Map<Key, Value>(targetMap.entries());

  for (const [ key, value ] of workpiece.entries()) {
    if (!filter(key, value)) {
      workpiece.delete(key);
    }
  }

  return workpiece;

}
