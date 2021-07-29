export default function isNonEmptyArray(potentialArray) {
    if (!Array.isArray(potentialArray)) {
        return false;
    }
    return potentialArray.length > 0;
}
