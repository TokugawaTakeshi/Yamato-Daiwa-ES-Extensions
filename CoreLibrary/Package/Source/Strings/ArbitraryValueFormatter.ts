import IndentationCoordinator from "./IndentationCoordinator";


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


        if (rawEntity instanceof Set) {
          ArbitraryValueFormatter.stringifyAndFormatSet(rawEntity);
        }

        if (rawEntity instanceof Map) {
          return ArbitraryValueFormatter.stringifyAndFormatMap(rawEntity);
        }


        return ArbitraryValueFormatter.stringifyAsPlainObject(rawEntity);

      }

    }

  }

  private static stringifyAsPlainObject(
    targetObject: object,
    indentationCoordinator: IndentationCoordinator = new IndentationCoordinator()
  ): string {

    let accumulatingResult: string = "{";

    indentationCoordinator.incrementIndent();

    for (const [ key, value ] of Object.entries(targetObject)) {
      accumulatingResult = accumulatingResult +
          `\n${ indentationCoordinator.insertIndent() }` +
          `${ key }: ${ ArbitraryValueFormatter.stringifyAndFormat(value) }`;
    }

    indentationCoordinator.decrementIndent();

    return `${ accumulatingResult }\n}`;

  }

  private static stringifyAndFormatSet(targetSet: ReadonlySet<unknown>): string {
    return `Set(${ targetSet.size }) { ${ Array.from(targetSet).toString() } }`;
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
