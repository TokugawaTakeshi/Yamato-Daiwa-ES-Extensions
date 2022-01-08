export default function getDaysCountInSpecificMonth(
  parametersObject: {
    year: number;
  } & (
    { monthNumber__numerationFrom0: number; } |
    { monthNumber__numerationFrom1: number; }
  )
): number {

  const targetMonthNumber__numerationFrom1: number = "monthNumber__numerationFrom1" in parametersObject ?
      parametersObject.monthNumber__numerationFrom1 : parametersObject.monthNumber__numerationFrom0 + 1;

  return new Date(parametersObject.year, targetMonthNumber__numerationFrom1, 0).getDate();
}
