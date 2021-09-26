export default function substituteWhenUndefined<TargetValue>(
    targetValue: TargetValue | undefined, defaultValue: TargetValue
): TargetValue {
  return typeof targetValue === "undefined" ? defaultValue : targetValue;
}
