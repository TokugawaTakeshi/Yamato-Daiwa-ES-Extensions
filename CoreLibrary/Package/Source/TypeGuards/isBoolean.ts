export default function isBoolean(potentialBooleanValue: unknown): potentialBooleanValue is boolean {
  return typeof potentialBooleanValue === "boolean";
}
