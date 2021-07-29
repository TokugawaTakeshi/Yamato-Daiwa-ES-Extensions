export default function undefinedToEmptyArray(targetValue) {
    return typeof targetValue === "undefined" ? [] : targetValue;
}
