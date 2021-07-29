export default function isNonEmptyString(potentialString) {
    return typeof potentialString === "string" && potentialString.length > 0;
}
