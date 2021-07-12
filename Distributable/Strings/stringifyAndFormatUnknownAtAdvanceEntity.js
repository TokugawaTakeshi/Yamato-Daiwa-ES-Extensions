"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isString_1 = require("../TypeGuards/Strings/isString");
const isNonNullObject_1 = require("../TypeGuards/Objects/isNonNullObject");
function stringifyAndFormatUnknownAtAdvanceEntity(rawEntity) {
    if (isString_1.default(rawEntity)) {
        return rawEntity;
    }
    if (rawEntity instanceof Error) {
        return String(rawEntity);
    }
    if (isNonNullObject_1.default(rawEntity)) {
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
exports.default = stringifyAndFormatUnknownAtAdvanceEntity;
