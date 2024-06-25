export default function substituteWhenNull<TargetValue>(
  targetValue: TargetValue | null, defaultValue: TargetValue
): TargetValue {

  /* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing --
   * Intended to be used with environments wihtout nullish coalescing.
   * Also `undefined` must not be substituted (actual for non-TypeScript environments). */
  return targetValue === null ? defaultValue : targetValue;

}
