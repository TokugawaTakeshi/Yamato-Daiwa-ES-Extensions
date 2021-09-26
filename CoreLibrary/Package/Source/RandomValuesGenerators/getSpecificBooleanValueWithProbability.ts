export default function getSpecificBooleanValueWithProbability(
  {
    value,
    probability__percents
  }: {
    value: boolean;
    probability__percents: number;
  }
): boolean {

  if (value) {
    return Math.random() < (probability__percents / 100);
  }

  return Math.random() >= (probability__percents / 100);
}
