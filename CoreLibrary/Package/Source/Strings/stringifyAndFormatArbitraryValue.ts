import isString from "../TypeGuards/Strings/isString";
import isNonNullObject from "../TypeGuards/Objects/isNonNullObject";
import isNumber from "../TypeGuards/Numbers/isNumber";
import isBoolean from "../TypeGuards/isBoolean";
import isEitherUndefinedOrNull from "../TypeGuards/Nullables/isEitherUndefinedOrNull";


export default function stringifyAndFormatArbitraryValue(rawEntity: unknown): string {

  if (isString(rawEntity)) {
    return rawEntity;
  }


  if (isNumber(rawEntity) || isBoolean(rawEntity) || isEitherUndefinedOrNull(rawEntity)) {
    return String(rawEntity);
  }


  if (rawEntity instanceof Error) {
    return String(rawEntity);
  }


  if (rawEntity instanceof RegExp) {
    return rawEntity.toString();
  }


  if (isNonNullObject(rawEntity)) {

    /* 〔 Theory 〕 If thrown entity is recursive, error could occur. */
    try {

      let stringifiedObjectTypeEntity: string;

      if (rawEntity instanceof Set) {
        stringifiedObjectTypeEntity = JSON.stringify(Array.from(rawEntity), null, 2);
      } else if (rawEntity instanceof Map) {
        stringifiedObjectTypeEntity = JSON.stringify(Object.fromEntries(rawEntity), null, 2);
      } else {
        stringifiedObjectTypeEntity = JSON.stringify(rawEntity, null, 2);
      }

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
