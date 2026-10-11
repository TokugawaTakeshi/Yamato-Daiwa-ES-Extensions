export default function undefinedToFalse<BasicType>(targetValue: BasicType): Exclude<BasicType, undefined> | false {
  /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
   * Currently, no idea how to avoid the type assertion. */
  return typeof targetValue === "undefined" ? false : (targetValue as Exclude<BasicType, undefined>);
}
