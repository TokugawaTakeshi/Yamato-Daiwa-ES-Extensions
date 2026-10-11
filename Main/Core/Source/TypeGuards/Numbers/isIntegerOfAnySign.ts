/* [ Unknown TS Feature ] Do NOT change this order of overloadings.
*  If to change this order, the `potentialInteger` will be considered as `never` if initially have `number` type but
*    not pass this check. */
export default function isIntegerOfAnySign(potentialInteger: number): boolean;

export default function isIntegerOfAnySign(potentialInteger: unknown): potentialInteger is number;


/** @alias isPositiveIntegerOrZero */
export default function isIntegerOfAnySign(potentialInteger: unknown): potentialInteger is number {
  return typeof potentialInteger === "number" ? Number.isInteger(potentialInteger) : false;
}
