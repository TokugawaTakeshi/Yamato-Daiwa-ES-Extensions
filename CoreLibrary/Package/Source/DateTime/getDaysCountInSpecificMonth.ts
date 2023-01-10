export default function getDaysCountInSpecificMonth(
  sourceData: Readonly<
    { year: number; } &
    (
      { monthNumber__numerationFrom0: number; } |
      { monthNumber__numerationFrom1: number; }
    )
  >
): number {

  const targetMonthNumber__numerationFrom1: number = "monthNumber__numerationFrom1" in sourceData ?
      sourceData.monthNumber__numerationFrom1 : sourceData.monthNumber__numerationFrom0 + 1;

  return new Date(sourceData.year, targetMonthNumber__numerationFrom1, 0).getDate();

}
