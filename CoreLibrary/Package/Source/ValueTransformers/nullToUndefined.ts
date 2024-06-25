export default function nullToUndefined<BasicType>(targetValue: BasicType | null): BasicType | undefined {

  /* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing, no-undefined --
   * @typescript-eslint/prefer-nullish-coalescing: Must work in environments without nullish coalescing.
   * no-undefined: According to this function, it must return `undefined` when `null` has been passed. */
  return targetValue === null ? undefined : targetValue;

}
