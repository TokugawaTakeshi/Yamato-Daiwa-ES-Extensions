export default function secondsToMilliseconds(secondsAmount: number): number {

  /* eslint-disable-next-line @typescript-eslint/no-magic-numbers --
  *  Here is just one simple operation; subjectively the extracting of '1000' to constant will the overkill. */
  return 1000 * secondsAmount;

}
