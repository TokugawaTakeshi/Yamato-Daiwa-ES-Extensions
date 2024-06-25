export default function getArithmeticMean(...numbers: ReadonlyArray<number>): number {
  return numbers.length > 0 ?
      numbers.reduce(
        (previous: number, current: number): number => previous + current,
        0
      ) / numbers.length :
      0;
}
