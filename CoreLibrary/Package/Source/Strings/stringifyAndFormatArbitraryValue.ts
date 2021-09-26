import isString from "../TypeGuards/Strings/isString";
import isNonNullObject from "../TypeGuards/Objects/isNonNullObject";


export default function stringifyAndFormatArbitraryValue(rawEntity: unknown): string {

  if (isString(rawEntity)) {
    return rawEntity;
  }

  if (rawEntity instanceof Error) {
    return String(rawEntity);
  }

  if (isNonNullObject(rawEntity)) {

    /* 〔 Theory 〕 If thrown entity is recursive error could occur. */
    try {

      const stringifiedObjectTypeEntity: string = JSON.stringify(rawEntity, null, 2);

      if (stringifiedObjectTypeEntity === "{}") {
        return "{}";
      } else if (stringifiedObjectTypeEntity === "[]") {
        return "[]";
      }

      return stringifiedObjectTypeEntity;

    } catch {
      return String(rawEntity);
    }
  }

  return String(rawEntity);
}
