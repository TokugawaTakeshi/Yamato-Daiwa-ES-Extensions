export default function separateEach4_DigitsGroupWithComma(targetNumber: number | bigint | string): string {
  return String(targetNumber).replace(/\B(?=(?:\d{4})+(?!\d))/gu, ",");
}
