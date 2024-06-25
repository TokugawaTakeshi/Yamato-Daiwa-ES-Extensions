import { isUndefined } from "../index";


export namespace RemovingEntriesFromMapOperation {

  export type SourceData<Key, Value> = Readonly<
    (
      {
        mutably: true;
        targetMap: Map<Key, Value>;
      } |
      {
        mutably: false;
        targetMap: ReadonlyMap<Key, Value>;
      }
    ) &
    (
      { key: Key; } |
      { keys: ReadonlyArray<Key>; }
    )
  >;

  export type Result<Key, Value> = Readonly<{
    updatedMap: Map<Key, Value>;
    removedEntries: Map<Key, Value>;
  }>;

}


export function removeEntriesFromMap<Key, Value>(
  sourceData: RemovingEntriesFromMapOperation.SourceData<Key, Value>
): RemovingEntriesFromMapOperation.Result<Key, Value> {

  const {
    targetMap,
    mutably
  }: RemovingEntriesFromMapOperation.SourceData<Key, Value> = sourceData;

  const removedEntries: Map<Key, Value> = new Map<Key, Value>();
  const workpiece: Map<Key, Value> = mutably ? targetMap : new Map<Key, Value>(targetMap);
  const targetKeys: ReadonlyArray<Key> = "key" in sourceData ? [ sourceData.key ] : sourceData.keys;

  for (const key of targetKeys) {

    const valueForCurrentKey: Value | undefined = workpiece.get(key);

    if (isUndefined(valueForCurrentKey)) {
      continue;
    }


    removedEntries.set(key, valueForCurrentKey);
    workpiece.delete(key);

  }

  return {
    updatedMap: workpiece,
    removedEntries
  };

}
