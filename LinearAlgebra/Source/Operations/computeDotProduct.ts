import type ReadonlyRowVector from "../Classes/ReadonlyRowVector";
import type ColumnVector from "../Classes/ColumnVector";


export default function computeDotProduct(
  firstMultiplier: ReadonlyRowVector<number> | ColumnVector<number> | ReadonlyArray<number>,
  secondMultiplier: ReadonlyRowVector<number> | ColumnVector<number> | ReadonlyArray<number>
): number {
  return firstMultiplier.reduce(
    (interimSum: number, elementOfFirstMultiplier: number, currentIndex: number): number =>
        interimSum + (elementOfFirstMultiplier * secondMultiplier[currentIndex]),
    0
  );
}
