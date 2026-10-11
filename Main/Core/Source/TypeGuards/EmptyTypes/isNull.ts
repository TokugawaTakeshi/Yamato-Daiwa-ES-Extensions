export default function isNull<TargetValue>(targetValue: TargetValue | null): targetValue is null {
  return targetValue === null;
}
