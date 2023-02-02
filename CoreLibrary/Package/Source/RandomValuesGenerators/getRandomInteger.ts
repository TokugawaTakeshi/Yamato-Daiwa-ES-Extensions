export default function getRandomInteger(
  compoundParameter: Readonly<{
    minimalValue: number;
    maximalValue: number;
  }>
): number {

  let minimalValue: number;
  let maximalValue: number;

  if (compoundParameter.minimalValue < compoundParameter.maximalValue) {
    minimalValue = compoundParameter.minimalValue;
    maximalValue = compoundParameter.maximalValue;
  } else {
    minimalValue = compoundParameter.maximalValue;
    maximalValue = compoundParameter.minimalValue;
  }

  return Math.floor((Math.random() * (maximalValue - minimalValue + 1)) + minimalValue);

}
