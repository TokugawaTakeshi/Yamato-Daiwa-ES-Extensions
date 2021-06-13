export default function isNotUndefined<TargetValue>(targetValue: TargetValue | undefined): targetValue is TargetValue {
  return typeof targetValue !== "undefined";
}
