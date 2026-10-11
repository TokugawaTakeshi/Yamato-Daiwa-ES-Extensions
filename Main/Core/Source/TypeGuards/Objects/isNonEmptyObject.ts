export default function isNonEmptyObject(potentialObject: unknown): potentialObject is object {

  if (typeof potentialObject !== "object" || potentialObject === null) {
    return false;
  }


  return Object.entries(potentialObject).length > 0;
}
