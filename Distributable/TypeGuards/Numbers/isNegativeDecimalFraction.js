export default function isNegativeDecimalFraction(potentialDecimalFraction) {
    if (typeof potentialDecimalFraction !== "number") {
        return false;
    }
    return /^-\d+\.\d+$/u.test(potentialDecimalFraction.toString());
}
