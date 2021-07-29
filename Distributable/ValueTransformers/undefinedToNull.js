export default function undefinedToNull(targetValue) {
    return typeof targetValue === "undefined" ? null : targetValue;
}
