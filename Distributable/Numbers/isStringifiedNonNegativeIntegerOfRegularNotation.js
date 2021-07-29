export default function isStringifiedNonNegativeIntegerOfRegularNotation(value) {
    return /^[1-9][0-9]*$/u.test(value);
}
