export default function insertSubstring(
  targetSubstring: string | null | undefined,
  options: {
    condition?: boolean;
    modifier?: (targetSubstring: string) => string;
  } = {}
): string {

  if (typeof targetSubstring === "undefined" || targetSubstring === null) {
    return "";
  }

  if (options.condition !== true) {
    return "";
  }

  return typeof options.modifier === "undefined" ? targetSubstring : options.modifier(targetSubstring);
}
