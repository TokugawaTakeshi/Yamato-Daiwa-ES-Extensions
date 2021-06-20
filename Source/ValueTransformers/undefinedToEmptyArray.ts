export default function undefinedToEmptyArray<ArrayElement>(
    targetValue: Array<ArrayElement> | undefined
): Array<ArrayElement> {
  return typeof targetValue === "undefined" ? [] : targetValue;
}
