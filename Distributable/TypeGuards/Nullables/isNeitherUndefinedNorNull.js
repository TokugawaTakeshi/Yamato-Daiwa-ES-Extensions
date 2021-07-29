export default function isNeitherUndefinedNorNull(targetValue) {
    return typeof targetValue !== "undefined" && targetValue !== null;
}
