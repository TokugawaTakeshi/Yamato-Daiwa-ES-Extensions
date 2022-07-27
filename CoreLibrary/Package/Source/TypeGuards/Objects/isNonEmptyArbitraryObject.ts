import type { ArbitraryObject } from "../../Types/ArbitraryObject";


export default function isNonEmptyArbitraryObject(potentialObject: unknown): potentialObject is ArbitraryObject {
  return typeof potentialObject === "object" && potentialObject !== null && Object.entries(potentialObject).length > 0;
}
