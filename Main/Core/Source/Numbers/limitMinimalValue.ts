export default function limitMinimalValue(
  { targetNumber, minimalValue }: Readonly<{ targetNumber: number; minimalValue: number; }>
): number;

export default function limitMinimalValue(
  { targetNumber, minimalValue }: Readonly<{ targetNumber: number | bigint; minimalValue: number; }>
): bigint;


export default function limitMinimalValue(
  { targetNumber, minimalValue }: Readonly<{ targetNumber: number | bigint; minimalValue: number | bigint; }>
): number | bigint {
  return targetNumber < minimalValue ? minimalValue : targetNumber;
}
