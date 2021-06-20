export default function getRandomInteger(
  {
    minimalValue,
    maximalValue
  }: {
    minimalValue: number;
    maximalValue: number;
  }
): number {
  return Math.floor((Math.random() * (maximalValue - minimalValue + 1)) + minimalValue);
}
