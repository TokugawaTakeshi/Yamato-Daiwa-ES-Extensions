export default function isString(potentialString: unknown): potentialString is string {
  return typeof potentialString === "string";
}
