export default function getDaysCountInSpecificMonth(
  sourceDataAndOptions:
      Readonly<
        { year: number; } &
        (
          { monthNumber__numerationFrom0: number; } |
          { monthNumber__numerationFrom1: number; }
        )
      >
): number {

  const targetMonthNumber__numerationFrom1: number = "monthNumber__numerationFrom1" in sourceDataAndOptions ?
      sourceDataAndOptions.monthNumber__numerationFrom1 : sourceDataAndOptions.monthNumber__numerationFrom0 + 1;

  return new Date(sourceDataAndOptions.year, targetMonthNumber__numerationFrom1, 0).getDate();

}
