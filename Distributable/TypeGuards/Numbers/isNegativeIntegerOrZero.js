export default function isNegativeIntegerOrZero(potentialInteger) {
    if (typeof potentialInteger !== "number") {
        return false;
    }
    return Number.isInteger(potentialInteger) && potentialInteger <= 0;
}
