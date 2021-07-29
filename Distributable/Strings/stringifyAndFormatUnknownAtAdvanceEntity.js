import isString from "../TypeGuards/Strings/isString";
import isNonNullObject from "../TypeGuards/Objects/isNonNullObject";
export default function stringifyAndFormatUnknownAtAdvanceEntity(rawEntity) {
    if (isString(rawEntity)) {
        return rawEntity;
    }
    if (rawEntity instanceof Error) {
        return String(rawEntity);
    }
    if (isNonNullObject(rawEntity)) {
        try {
            const stringifiedObjectTypeEntity = JSON.stringify(rawEntity, null, 2);
            if (stringifiedObjectTypeEntity === "{}") {
                return "{}";
            }
            else if (stringifiedObjectTypeEntity === "[]") {
                return "[]";
            }
            return stringifiedObjectTypeEntity;
        }
        catch {
            return String(rawEntity);
        }
    }
    return String(rawEntity);
}
