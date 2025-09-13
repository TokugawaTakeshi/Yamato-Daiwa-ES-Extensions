export default function isValidNativeDate(targetDate: Date): boolean {
  return targetDate.toString() !== "Invalid Date";
}
