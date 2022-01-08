export default function insertSubstringIf(substring: string | number, condition: boolean): string {
  return condition ? substring.toString() : "";
}
