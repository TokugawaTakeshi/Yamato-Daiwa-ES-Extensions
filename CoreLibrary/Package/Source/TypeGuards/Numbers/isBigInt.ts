export default function isBigInt(potentialNumber: unknown): potentialNumber is bigint {
  return typeof potentialNumber === "bigint";
}
