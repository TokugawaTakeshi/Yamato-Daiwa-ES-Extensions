import type { PossiblyReadonlyParsedJSON } from "../../Types/ParsedJSON";


export default function isPossiblyReadonlyParsedJSON(targetValue: unknown): targetValue is PossiblyReadonlyParsedJSON {
  return typeof targetValue === "object";
}
