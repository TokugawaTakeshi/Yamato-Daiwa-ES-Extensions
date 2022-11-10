export default function getDaysCountInSpecificMonth(
  namedParameters: Readonly<
    { year: number; } &
    (
      { monthNumber__numerationFrom0: number; } |
      { monthNumber__numerationFrom1: number; }
    )
  >
): number {

  const targetMonthNumber__numerationFrom1: number = "monthNumber__numerationFrom1" in namedParameters ?
      namedParameters.monthNumber__numerationFrom1 : namedParameters.monthNumber__numerationFrom0 + 1;

  return new Date(namedParameters.year, targetMonthNumber__numerationFrom1, 0).getDate();

}
