export default function isNaturalNumber(potentialNaturalNumber: unknown): potentialNaturalNumber is number {

  if (typeof potentialNaturalNumber !== "number") {
    return false;
  }


  return Number.isInteger(potentialNaturalNumber) && potentialNaturalNumber > 0;
}
