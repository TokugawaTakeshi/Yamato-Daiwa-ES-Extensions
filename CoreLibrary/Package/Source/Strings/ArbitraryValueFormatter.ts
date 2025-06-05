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

        if (rawEntity === null) {
          return "null";
        }

        if (rawEntity instanceof Map) {
          return ArbitraryValueFormatter.stringifyAndFormatMap(rawEntity);
        }


        return "";
        // return ArbitraryValueFormatter.stringifyAndFormatObject(rawEntity);

      }

    }

  }


  // private static stringifyAndFormatObject(targetObject: object): string {
  //
  // }

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
