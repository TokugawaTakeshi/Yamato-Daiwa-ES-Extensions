export default function nullToUndefined<BasicType>(targetValue: BasicType | null): BasicType | undefined {

  /* 〔 ESLint muting rationale 〕 Because the function converting the 'null' to 'undefined', the explicit returning
  *   of 'undefined' is intentional. */
  /* eslint-disable-next-line no-undefined */
  return targetValue === null ? undefined : targetValue;
}
