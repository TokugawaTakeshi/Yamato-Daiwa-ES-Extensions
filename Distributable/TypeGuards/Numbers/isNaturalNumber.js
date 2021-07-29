export default function isNaturalNumber(potentialNaturalNumber) {
    if (typeof potentialNaturalNumber !== "number") {
        return false;
    }
    return Number.isInteger(potentialNaturalNumber) && potentialNaturalNumber > 0;
}
