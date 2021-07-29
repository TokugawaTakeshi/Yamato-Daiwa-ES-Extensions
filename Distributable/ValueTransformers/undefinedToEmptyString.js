export default function undefinedToEmptyString(targetValue) {
    return typeof targetValue === "string" && targetValue.length > 0 ? targetValue : "";
}
