export default function isEitherUndefinedOrNull(rawValue: unknown): rawValue is undefined | null {
  return typeof rawValue === "undefined" || rawValue === null;
}
