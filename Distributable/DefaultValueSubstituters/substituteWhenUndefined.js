export default function substituteWhenUndefined(targetValue, defaultValue) {
    return typeof targetValue === "undefined" ? defaultValue : targetValue;
}
