export default function isDecimalFractionOfAnySign(potentialDecimalFraction: unknown): potentialDecimalFraction is number {

  if (typeof potentialDecimalFraction !== "number") {
    return false;
  }

  /* 〔 Regular expression development 〕 https://regex101.com/r/xyZc5N/1 */
  return /^-?\d+\.\d+$/u.test(potentialDecimalFraction.toString());
}
