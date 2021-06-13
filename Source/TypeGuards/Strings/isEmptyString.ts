export default function isEmptyString(potentialString: unknown): potentialString is string {
  return typeof potentialString === "string" && potentialString.length === 0;
}
