export default abstract class ArbitraryValueFormatter {

  public static stringifyAndFormat(rawEntity: unknown): string {

    switch (typeof rawEntity) {

      case "string": return `"${ rawEntity }"`;
      case "symbol": return rawEntity.toString();

      case "number": return rawEntity.toString();
      case "bigint": return `${ rawEntity.toString() }n`;

      case "boolean": return `${ rawEntity }`;
      case "undefined": return "undefined";

      case "function": return rawEntity.toString();
      case "object": {

        if (
          rawEntity instanceof Error ||
          rawEntity instanceof RegExp
        ) {
          return rawEntity.toString();
        }


        if (rawEntity === null) {
          return "null";
        }

        if (rawEntity instanceof Map) {
          return ArbitraryValueFormatter.stringifyAndFormatMap(rawEntity);
        }


        return JSON.stringify(rawEntity, ArbitraryValueFormatter.stringifyNonCompatibleWithJSON_KeyAndValue, 2);

      }

    }

  }


  private static stringifyNonCompatibleWithJSON_KeyAndValue(_key: string, value: unknown): string {

    if (value instanceof Set) {
      return `Set(${ value.size }) { ${ Array.from(value).toString() } }`;
    }

    return String(value);

  }

  private static stringifyAndFormatMap<Key, Value>(targetMap: Map<Key, Value>): string {

    const stringifiedEntries: Array<string> = [];

    for (const [ key, value ] of targetMap.entries()) {
      stringifiedEntries.push(
        "{" +
        `  "${ key }",` +
        `  ${ ArbitraryValueFormatter.stringifyAndFormat(value) }` +
        "}"
      );
    }

    return "Map {" +
           stringifiedEntries.join("\n") +
            "}";

  }

}
