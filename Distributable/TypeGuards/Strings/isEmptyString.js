export default function isEmptyString(potentialString) {
    return typeof potentialString === "string" && potentialString.length === 0;
}
