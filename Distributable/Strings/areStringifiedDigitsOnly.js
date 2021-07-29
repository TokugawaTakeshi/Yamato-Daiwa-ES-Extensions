export default function areStringifiedDigitsOnly(potentialStringifiedDigits) {
    return /^[0-9]+$/u.test(potentialStringifiedDigits);
}
