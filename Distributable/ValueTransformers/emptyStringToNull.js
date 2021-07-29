export default function emptyStringToNull(targetValue) {
    return targetValue.length > 0 ? targetValue : null;
}
