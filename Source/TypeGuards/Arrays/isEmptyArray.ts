export default function isEmptyArray(potentialArray: unknown): potentialArray is Array<unknown> {
  return Array.isArray(potentialArray) && potentialArray.length === 0;
}
