export default function isNonEmptyArray(potentialArray: unknown): potentialArray is Array<unknown> {

  if (!Array.isArray(potentialArray)) {
    return false;
  }


  return potentialArray.length > 0;

}
