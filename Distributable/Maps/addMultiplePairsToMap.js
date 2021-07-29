export default function addMultiplePairsToMap(targetMap, newPairs) {
    for (const [key, value] of newPairs) {
        targetMap.set(key, value);
    }
    return targetMap;
}
