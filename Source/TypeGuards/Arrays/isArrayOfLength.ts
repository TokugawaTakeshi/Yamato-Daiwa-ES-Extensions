export default function isArrayOfLength<ArrayElement>(
    potentialArray: unknown, expectedLength: number
): potentialArray is Array<ArrayElement> {

  if (!Array.isArray(potentialArray)) {
    return false;
  }

  return potentialArray.length === expectedLength;
}
