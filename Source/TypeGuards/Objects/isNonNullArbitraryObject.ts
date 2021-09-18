import { ArbitraryObject } from "../../Types/ArbitraryObject";


export default function isNonNullArbitraryObject(potentialObject: unknown): potentialObject is ArbitraryObject {
  return typeof potentialObject === "object" && potentialObject !== null;
}
