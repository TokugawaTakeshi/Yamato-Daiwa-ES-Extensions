import IndentationCoordinator from "./IndentationCoordinator";
import removeLastCharacter from "./removeLastCharacter";


export default abstract class ArbitraryValueFormatter {

  public static stringifyAndFormat(rawEntity: unknown, indentationCoordinator?: IndentationCoordinator): string {

    switch (typeof rawEntity) {

      case "string": return `"${ rawEntity }"`;
      case "symbol": return rawEntity.toString();

      case "number": return rawEntity.toString();
      case "bigint": return `${ rawEntity.toString() }n`;

      case "boolean": return `${ rawEntity }`;
      case "undefined": return "undefined";

      case "function": return [
        "String",
        "Number",
        "BigInt",
        "Boolean",
        "Array"
      ].includes(rawEntity.name) ? `[${ rawEntity.name }]` : rawEntity.toString();

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


        if (rawEntity instanceof Array) {
          return ArbitraryValueFormatter.stringifyAsArray(rawEntity, indentationCoordinator);
        }


        if (rawEntity instanceof Set) {
          return ArbitraryValueFormatter.stringifyAndFormatSet(rawEntity, indentationCoordinator);
        }


        if (rawEntity instanceof Map) {
          return ArbitraryValueFormatter.stringifyAndFormatMap(rawEntity, indentationCoordinator);
        }


        if (rawEntity instanceof Date) {
          return rawEntity.toISOString();
        }


        return ArbitraryValueFormatter.stringifyAsPlainObject(rawEntity, indentationCoordinator);

      }

    }

  }


  private static stringifyAsArray(
    targetArray: ReadonlyArray<unknown>,
    indentationCoordinator: IndentationCoordinator = new IndentationCoordinator()
  ): string {

    let accumulatingResult: string = "[";

    indentationCoordinator.incrementIndent();

    for (const element of targetArray) {
      accumulatingResult = accumulatingResult +
          `\n${ indentationCoordinator.insertIndent() }` +
          `${ ArbitraryValueFormatter.stringifyAndFormat(element, indentationCoordinator) },`;
    }

    accumulatingResult = removeLastCharacter(accumulatingResult);

    indentationCoordinator.decrementIndent();

    return `${ accumulatingResult }\n${ indentationCoordinator.insertIndent() }]`;

  }

  private static stringifyAndFormatSet(
    targetSet: ReadonlySet<unknown>,
    indentationCoordinator: IndentationCoordinator = new IndentationCoordinator()
  ): string {

    let accumulatingResult: string = `Set(${ targetSet.size }) [`;

    indentationCoordinator.incrementIndent();

    for (const element of targetSet) {
      accumulatingResult = accumulatingResult +
          `\n${ indentationCoordinator.insertIndent() }` +
          `${ ArbitraryValueFormatter.stringifyAndFormat(element, indentationCoordinator) },`;
    }

    accumulatingResult = removeLastCharacter(accumulatingResult);

    indentationCoordinator.decrementIndent();

    return `${ accumulatingResult }\n${ indentationCoordinator.insertIndent() }]`;

  }

  private static stringifyAndFormatMap<Key, Value>(
    targetMap: Map<Key, Value>,
    indentationCoordinator: IndentationCoordinator = new IndentationCoordinator()
  ): string {

    let accumulatingResult: string = `Map(${ targetMap.size }) [`;

    indentationCoordinator.incrementIndent();

    for (const [ key, value ] of targetMap.entries()) {
      accumulatingResult = accumulatingResult +
          `\n${ indentationCoordinator.insertIndent() }[\n` +
            indentationCoordinator.incrementIndentAndInsert() +
              `${ ArbitraryValueFormatter.stringifyAndFormat(key, indentationCoordinator) },\n` +
            indentationCoordinator.insertIndent() +
              `${ ArbitraryValueFormatter.stringifyAndFormat(value, indentationCoordinator) }\n` +
          `${ indentationCoordinator.decrementIndentAndInsert() }],`;
    }

    accumulatingResult = removeLastCharacter(accumulatingResult);

    indentationCoordinator.decrementIndent();

    return `${ accumulatingResult }\n${ indentationCoordinator.insertIndent() }]`;

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
          `${ key }: ${ ArbitraryValueFormatter.stringifyAndFormat(value, indentationCoordinator) },`;
    }

    accumulatingResult = removeLastCharacter(accumulatingResult);

    indentationCoordinator.decrementIndent();

    return `${ accumulatingResult }\n${ indentationCoordinator.insertIndent() }}`;

  }

}


export function stringifyAndFormatArbitraryValue(rawEntity: unknown): string {
  return ArbitraryValueFormatter.stringifyAndFormat(rawEntity);
}
