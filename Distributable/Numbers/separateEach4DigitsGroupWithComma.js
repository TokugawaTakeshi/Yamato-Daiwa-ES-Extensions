export default function separateEach4DigitsGroupWithComma(targetNumber) {
    return String(targetNumber).replace(/\B(?=(?:\d{4})+(?!\d))/gu, ",");
}
