export default function separateEach3DigitsGroupWithComma(targetNumber) {
    return String(targetNumber).replace(/\B(?=(?:\d{3})+(?!\d))/gu, ",");
}
