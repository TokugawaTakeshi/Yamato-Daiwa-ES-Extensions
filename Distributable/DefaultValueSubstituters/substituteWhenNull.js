export default function substituteWhenNull(targetValue, defaultValue) {
    return targetValue === null ? defaultValue : targetValue;
}
