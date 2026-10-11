export default function getSpecificBooleanValueWithProbability(
  {
    value,
    probability__percents
  }: {
    value: boolean;
    probability__percents: number;
  }
): boolean {
  return value ? Math.random() < (probability__percents / 100) : Math.random() >= (probability__percents / 100);
}
