export default function isNegativeIntegerOrZero(potentialInteger: unknown): potentialInteger is number;

export default function isNegativeIntegerOrZero(potentialInteger: number): boolean;


export default function isNegativeIntegerOrZero(potentialInteger: unknown): potentialInteger is number {

  if (typeof potentialInteger !== "number") {
    return false;
  }


  return Number.isInteger(potentialInteger) && potentialInteger <= 0;

}
