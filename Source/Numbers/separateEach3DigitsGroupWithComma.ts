export default function separateEach3DigitsGroupWithComma(targetNumber: number | bigint | string): string {
  return String(targetNumber).replace(/\B(?=(?:\d{3})+(?!\d))/gu, ",");
}
