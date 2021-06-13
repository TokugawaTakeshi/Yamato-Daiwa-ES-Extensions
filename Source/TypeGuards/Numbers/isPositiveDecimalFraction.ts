export default function isPositiveDecimalFraction(potentialDecimalFraction: unknown): potentialDecimalFraction is number {

  if (typeof potentialDecimalFraction !== "number") {
    return false;
  }

  return /^\d+\.\d+$/u.test(potentialDecimalFraction.toString());
}
