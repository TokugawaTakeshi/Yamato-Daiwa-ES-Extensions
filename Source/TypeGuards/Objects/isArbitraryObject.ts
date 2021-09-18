import { ArbitraryObject } from "../../Types/ArbitraryObject";


export default function isArbitraryObject(potentialObject: unknown): potentialObject is ArbitraryObject {
  return typeof potentialObject === "object";
}
