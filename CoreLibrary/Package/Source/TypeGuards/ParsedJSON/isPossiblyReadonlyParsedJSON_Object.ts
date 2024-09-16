import type { ParsedJSON_Object, ReadonlyParsedJSON_Object } from "../../Types/ParsedJSON";


export default function isPossiblyReadonlyParsedJSON_Object(
  targetValue: unknown
): targetValue is ParsedJSON_Object | ReadonlyParsedJSON_Object {
  return typeof targetValue === "object" && !Array.isArray(targetValue);
}
