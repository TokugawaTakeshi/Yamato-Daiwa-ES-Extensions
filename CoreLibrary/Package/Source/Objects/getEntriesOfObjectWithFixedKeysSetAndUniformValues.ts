export default function getEntriesOfObjectWithFixedKeysSetAndUniformValues<Keys extends string, Values>(
  targetObject: Readonly<{ [key in Keys]?: Values; }>
): Array<[ Keys, Values ]> {
  /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
   * `Object.entries` does not support the keys constrained to enumeration. */
  return Object.entries(targetObject) as Array<[ Keys, Values ]>;
}
