"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createMapBasedOnOtherMap(inputMap, transformer) {
    const outputMap = new Map();
    inputMap.forEach((value, key) => {
        outputMap.set(...transformer(key, value));
    });
    return outputMap;
}
exports.default = createMapBasedOnOtherMap;
