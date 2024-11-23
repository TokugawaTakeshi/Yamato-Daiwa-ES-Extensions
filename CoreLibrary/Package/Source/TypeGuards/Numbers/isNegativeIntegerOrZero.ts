/* [ Unknown TS Feature ] Do NOT change this order of overloadings.
 *  If to change this order, the `potentialInteger` will be considered as `never` if initially have `number` type but
 *    not pass this check. */
export default function isNegativeIntegerOrZero(potentialInteger: number): boolean;

export default function isNegativeIntegerOrZero(potentialInteger: unknown): potentialInteger is number;


export default function isNegativeIntegerOrZero(potentialInteger: unknown): potentialInteger is number {

  if (typeof potentialInteger !== "number") {
    return false;
  }


  return Number.isInteger(potentialInteger) && potentialInteger <= 0;

}
