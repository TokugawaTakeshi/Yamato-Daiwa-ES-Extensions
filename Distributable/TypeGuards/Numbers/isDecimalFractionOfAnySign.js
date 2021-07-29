export default function isDecimalFractionOfAnySign(potentialDecimalFraction) {
    if (typeof potentialDecimalFraction !== "number") {
        return false;
    }
    return /^-?\d+\.\d+$/u.test(potentialDecimalFraction.toString());
}
