/* [ Theory ] Just creating of Date instance and checking if for "Invalid Date" stringified value will not detect the
*     invalid date in all cases. For example, although the definition "1970-1-01" is invalid, will be recognized as
*     "1969-12-31T15:00:00.000Z" this way.. */
export default function isValidISO8601DateAndPossiblyTimeDefinition(
  targetDateAndPossiblyTimeDefinition__ISO8601: string
): boolean {

  // TODO /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z
  // TODO 年のみ、年＋月のみ、色々確認

  // (?:\d{4}$)|(?:\d{4}-\d{2}$)|(?:\d{4}-\d{2}-\d{2}$)

  return new Date(targetDateAndPossiblyTimeDefinition__ISO8601).toString() !== "Invalid Date";
}
