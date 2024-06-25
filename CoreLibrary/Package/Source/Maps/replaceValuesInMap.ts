export namespace ReplaceOfValuesInMapOperation {

  export type Replacement<Key, Value> = Readonly<
    { key: Key; } &
    (
      { newValue: Value; } |
      { replacer: (oldValue: Value) => Value; }
    )
  >;

}

export default function replaceValuesInMap<Key, Value>(
  compoundParameter: Readonly<
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
      ReplaceOfValuesInMapOperation.Replacement<Key, Value> |
      { replacements: ReadonlyArray<ReplaceOfValuesInMapOperation.Replacement<Key, Value>>; }
    )
  >
): Map<Key, Value> {

  const workpiece: Map<Key, Value> = compoundParameter.mutably ?
      compoundParameter.targetMap : new Map(compoundParameter.targetMap);

  let replacements: ReadonlyArray<ReplaceOfValuesInMapOperation.Replacement<Key, Value>>;

  if ("replacements" in compoundParameter) {
    replacements = compoundParameter.replacements;
  } else if ("newValue" in compoundParameter) {
    replacements = [ { key: compoundParameter.key, newValue: compoundParameter.newValue } ];
  } else {
    replacements = [ { key: compoundParameter.key, replacer: compoundParameter.replacer } ];
  }

  for (const replacement of replacements) {

    if ("newValue" in replacement) {
      workpiece.set(replacement.key, replacement.newValue);
      continue;
    }


    const oldValue: Value | undefined = workpiece.get(replacement.key);

    if (typeof oldValue === "undefined") {
      continue;
    }


    workpiece.set(replacement.key, replacement.replacer(oldValue));

  }


  return workpiece;

}
