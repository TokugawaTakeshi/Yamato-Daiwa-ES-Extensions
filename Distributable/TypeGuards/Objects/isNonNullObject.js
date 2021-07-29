export default function isNonNullObject(potentialObject) {
    return typeof potentialObject === "object" && potentialObject !== null;
}
