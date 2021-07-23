export default function capitalizeFirstSymbol(targetString: string): string {
  /* [ Theory ] In this case using of `targetString.slice' will not cause the problem even if first symbol is a surrogate
  * pair (checked in capitalizeFirstSymbol.test.ts) */
  return targetString.charAt(0).toUpperCase() + targetString.slice(1);
}
