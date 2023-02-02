export default function insertSubstring(
  targetSubstring: string | number | null | undefined,
  options: Readonly<{
    condition?: boolean;
    modifier?: (targetSubstring: string) => string;
  }> = {}
): string {

  if (typeof targetSubstring === "undefined" || targetSubstring === null) {
    return "";
  }


  if (options.condition === false) {
    return "";
  }


  return typeof options.modifier === "undefined" ? targetSubstring.toString() : options.modifier(targetSubstring.toString());

}
