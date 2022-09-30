export default function substituteWhenNull<TargetValue>(
  targetValue: TargetValue | null, defaultValue: TargetValue
): TargetValue {
  return targetValue === null ? defaultValue : targetValue;
}
