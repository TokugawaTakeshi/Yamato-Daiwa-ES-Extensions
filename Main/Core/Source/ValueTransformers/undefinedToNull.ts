export default function undefinedToNull<BasicType>(targetValue: BasicType): Exclude<BasicType, undefined> | null {
  /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
   * Currently, no idea how to avoid the type assertion. */
  return typeof targetValue === "undefined" ? null : (targetValue as Exclude<BasicType, undefined>);
}
