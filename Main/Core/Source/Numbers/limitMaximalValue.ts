export default function limitMaximalValue(
  compoundParameter: Readonly<{ targetNumber: number; maximalValue: number; }>
): number;

export default function limitMaximalValue(
  compoundParameter: Readonly<{ targetNumber: number | bigint; maximalValue: bigint; }>
): bigint;


export default function limitMaximalValue(
  { targetNumber, maximalValue }: Readonly<{ targetNumber: number | bigint; maximalValue: number | bigint; }>
): number | bigint {
  return targetNumber > maximalValue ? maximalValue : targetNumber;
}
