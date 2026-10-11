export default function isNonNullObject(potentialObject: unknown): potentialObject is object {
  return typeof potentialObject === "object" && potentialObject !== null;
}
