"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addMultiplePairsToMap(targetMap, newPairs) {
    for (const [key, value] of newPairs) {
        targetMap.set(key, value);
    }
    return targetMap;
}
exports.default = addMultiplePairsToMap;
