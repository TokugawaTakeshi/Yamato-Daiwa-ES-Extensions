export default function isValidISO8601DateAndPossiblyTimeDefinition(
  targetDateAndPossiblyTimeDefinition__ISO8601: string
): boolean {
  return new Date(targetDateAndPossiblyTimeDefinition__ISO8601).toString() !== "Invalid Date";
}
