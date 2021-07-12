"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterMap(targetMap, filteringPredicate) {
    const filteredMap = new Map();
    targetMap.forEach((value, key) => {
        if (filteringPredicate(key, value)) {
            filteredMap.set(key, value);
        }
    });
    return filteredMap;
}
exports.default = filterMap;
