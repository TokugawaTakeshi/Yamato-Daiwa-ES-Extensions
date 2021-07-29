export default function isEmptyObject(potentialObject) {
    if (typeof potentialObject !== "object" || potentialObject === null) {
        return false;
    }
    return Object.entries(potentialObject).length === 0;
}
