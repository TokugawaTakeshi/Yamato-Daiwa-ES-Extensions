export default function nullToZero(targetValue: number | null): number {

  /* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing --
   * This function must convert only `null` to `0`, while if to use the nullish coalescing, `undefined` also will be
   *   converted. Although the `undefined` could not be legally passed in TypeScript environment, bot better support
   *   of non-TypeScript environment, the possible `undefined` value must be respected. */
  return targetValue === null ? 0 : targetValue;

}
