export default function getArithmeticMean(...numbers: ReadonlyArray<number>): number {
  return numbers.reduce((previous: number, current: number): number => previous + current) / numbers.length;
}
