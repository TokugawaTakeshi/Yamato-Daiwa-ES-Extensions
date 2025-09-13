/* [ Unknown TS Feature ] Do NOT change this order of overloadings.
 *  If to change this order, the `potentialInteger` will be considered as `never` if initially have `number` type but
 *    not pass this check. */
export default function isNaturalNumber(potentialNaturalNumber: number): boolean;

export default function isNaturalNumber(potentialNaturalNumber: unknown): potentialNaturalNumber is number;


export default function isNaturalNumber(potentialNaturalNumber: unknown): potentialNaturalNumber is number {

  if (typeof potentialNaturalNumber !== "number") {
    return false;
  }


  return Number.isInteger(potentialNaturalNumber) && potentialNaturalNumber > 0;

}
