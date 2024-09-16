export default function isPositiveDecimalFraction(potentialDecimalFraction: unknown): potentialDecimalFraction is number {
  return typeof potentialDecimalFraction === "number" ?
      (/^\d+\.\d+$/u).test(potentialDecimalFraction.toString()) :
      false;
}
