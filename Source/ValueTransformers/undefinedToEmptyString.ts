export default function undefinedToEmptyString(targetValue: string | undefined): string {
  return typeof targetValue === "string" && targetValue.length > 0 ? targetValue : "";
}
