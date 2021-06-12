export default function secondsToMilliseconds(secondsAmount: number): number {
  /*  〔 ESLint muting rationale 〕 Here is just one simple operation; subjectively the extracting of '1000' to constant
  *     will the overkill. */
  /* eslint-disable-next-line @typescript-eslint/no-magic-numbers */
  return 1000 * secondsAmount;
}
