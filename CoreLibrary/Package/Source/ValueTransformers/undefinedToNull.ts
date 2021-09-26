export default function undefinedToNull<BasicType>(targetValue: BasicType): Exclude<BasicType, undefined> | null {
  return typeof targetValue === "undefined" ? null : (targetValue as Exclude<BasicType, undefined>);
}
