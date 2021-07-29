export default function createMapBasedOnOtherMap(inputMap, transformer) {
    const outputMap = new Map();
    inputMap.forEach((value, key) => {
        outputMap.set(...transformer(key, value));
    });
    return outputMap;
}
