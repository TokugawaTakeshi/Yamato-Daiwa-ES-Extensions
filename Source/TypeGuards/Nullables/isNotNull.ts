export default function isNotNull<TargetValue>(targetValue: TargetValue | null): targetValue is TargetValue {
  return targetValue !== null;
}
