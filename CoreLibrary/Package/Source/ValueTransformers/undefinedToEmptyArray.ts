export default function undefinedToEmptyArray<ArrayElement>(
  targetValue: Array<ArrayElement> | undefined
): Array<ArrayElement>;

export default function undefinedToEmptyArray<ArrayElement>(
  targetValue: ReadonlyArray<ArrayElement> | undefined
): ReadonlyArray<ArrayElement>;

export default function undefinedToEmptyArray<ArrayElement>(
  targetValue: ReadonlyArray<ArrayElement> | undefined
): Array<ArrayElement> | ReadonlyArray<ArrayElement> {
  return typeof targetValue === "undefined" ? [] : targetValue;
}
