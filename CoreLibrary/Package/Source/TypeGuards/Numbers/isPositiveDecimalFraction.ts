/* [ Unknown TS Feature ] Do NOT change this order of overloadings.
 *  If to change this order, the `potentialInteger` will be considered as `never` if initially have `number` type but
 *    not pass this check. */
export default function isPositiveDecimalFraction(potentialDecimalFraction: number): boolean;

export default function isPositiveDecimalFraction(potentialDecimalFraction: unknown): potentialDecimalFraction is number;


export default function isPositiveDecimalFraction(potentialDecimalFraction: unknown): potentialDecimalFraction is number {
  return typeof potentialDecimalFraction === "number" ?
      (/^\d+\.\d+$/u).test(potentialDecimalFraction.toString()) :
      false;
}
