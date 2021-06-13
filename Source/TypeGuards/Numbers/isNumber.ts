export default function isNumber(potentialNumber: unknown): potentialNumber is number {
  return typeof potentialNumber === "number";
}
