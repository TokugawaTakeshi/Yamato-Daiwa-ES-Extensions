export default function isNonEmptyObject(potentialObject) {
    if (typeof potentialObject !== "object" || potentialObject === null) {
        return false;
    }
    return Object.entries(potentialObject).length > 0;
}
