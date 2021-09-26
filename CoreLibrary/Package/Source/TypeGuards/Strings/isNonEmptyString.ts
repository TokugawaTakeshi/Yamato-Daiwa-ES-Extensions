export default function isNonEmptyString(potentialString: unknown): potentialString is string {
  return typeof potentialString === "string" && potentialString.length > 0;
}
