export default function isNeitherUndefinedNorNull<TargetType>(
    targetValue: TargetType | null | undefined
): targetValue is TargetType {
  return typeof targetValue !== "undefined" && targetValue !== null;
}
